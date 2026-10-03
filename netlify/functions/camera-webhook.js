// Camera HikCentral ANPR - Webhook nhận biển số xe
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { plate, timestamp, imageUrl } = body;

    if (!plate) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Plate number required' })
      };
    }

    // Kiểm tra reset_lock để tránh ghi đè dữ liệu khi đang reset
    const store = getStore('kv');
    const resetLock = await store.get('reset_lock');
    if (resetLock && parseInt(resetLock) > Date.now()) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'Reset in progress, please retry' })
      };
    }

    // Lấy events hiện tại
    let events = [];
    try {
      const eventsData = await store.get('events');
      events = eventsData ? JSON.parse(eventsData) : [];
    } catch (e) {
      console.error('Error reading events:', e);
    }

    // Tạo event xe vào cổng từ camera
    const newEvent = {
      id: `camera_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'gate_in',
      plate: plate.toUpperCase().trim(),
      source: 'camera_hikcentral',
      timestamp: timestamp || Date.now(),
      imageUrl: imageUrl || null,
      createdAt: Date.now()
    };

    events.push(newEvent);

    // Lưu events
    await store.set('events', JSON.stringify(events), { atomic: true });

    // Lưu camera log
    try {
      let cameraLog = [];
      const cameraLogData = await store.get('camera_log');
      cameraLog = cameraLogData ? JSON.parse(cameraLogData) : [];
      
      cameraLog.push({
        timestamp: Date.now(),
        plate: newEvent.plate,
        status: 'success',
        imageUrl: imageUrl || null
      });

      // Giữ lại 1000 bản ghi gần nhất
      if (cameraLog.length > 1000) {
        cameraLog = cameraLog.slice(-1000);
      }

      await store.set('camera_log', JSON.stringify(cameraLog));
    } catch (logErr) {
      console.warn('Error logging camera data:', logErr);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        eventId: newEvent.id,
        plate: newEvent.plate,
        message: 'Vehicle recorded successfully'
      })
    };

  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process webhook',
        message: error.message
      })
    };
  }
};
