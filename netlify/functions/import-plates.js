// Import biển số xe từ Excel hoặc file CSV
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Lấy token từ header
    const token = event.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized - token required' })
      };
    }

    // Kiểm tra token
    const store = getStore('kv');
    const sessions = await store.get('sessions');
    const sessionList = sessions ? JSON.parse(sessions) : {};
    
    const session = Object.values(sessionList).find(s => s && s.token === token);
    if (!session) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid token' })
      };
    }

    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { plates, source = 'manual_import' } = body;

    if (!Array.isArray(plates) || plates.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Plates array required and cannot be empty' })
      };
    }

    // Kiểm tra reset_lock
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

    // Thêm các biển số mới
    const addedCount = 0;
    const errors = [];

    for (const plate of plates) {
      try {
        const cleanPlate = typeof plate === 'string' ? plate.toUpperCase().trim() : plate;
        
        if (!cleanPlate || cleanPlate.length < 3) {
          errors.push(`Invalid plate: ${plate}`);
          continue;
        }

        // Kiểm tra trùng lặp
        const exists = events.some(e => 
          e.plate === cleanPlate && 
          e.type === 'gate_in' && 
          e.source === source &&
          Date.now() - e.timestamp < 60000 // trong 1 phút
        );

        if (exists) {
          continue; // bỏ qua biển số trùng
        }

        const newEvent = {
          id: `import_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'gate_in',
          plate: cleanPlate,
          source: source,
          timestamp: Date.now(),
          createdAt: Date.now(),
          importedBy: session.username
        };

        events.push(newEvent);
      } catch (e) {
        errors.push(`Error processing plate: ${plate} - ${e.message}`);
      }
    }

    // Lưu events
    if (events.length > 0) {
      await store.set('events', JSON.stringify(events), { atomic: true });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        imported: events.length,
        errors: errors.length > 0 ? errors : null,
        message: `${events.length} plate(s) imported successfully`
      })
    };

  } catch (error) {
    console.error('Import error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to import plates',
        message: error.message
      })
    };
  }
};
