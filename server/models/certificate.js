const db = require("../config/db");

const Certificate = {
  tableName: "certificates",

  create: async (work_id, certificate_url, product_id, step_id) => { // product_id'yi geri ekleyin
    const result = await db.one(
      `INSERT INTO ${Certificate.tableName} (work_id, certificate_url, product_id, step_id) VALUES ($1, $2, $3, $4) RETURNING *`, // product_id'yi geri ekleyin
      [work_id, certificate_url, product_id, step_id] // product_id'yi geri ekleyin
    );
    return result;
  },
  
  findByWorkId: async (work_id) => {
    const result = await db.any(
      `SELECT * FROM ${Certificate.tableName} WHERE work_id = $1`,
      [work_id]
    );
    return result;
  },

  update: async (id, work_id, certificate_url, product_id) => {
    const result = await db.one(
      `UPDATE ${Certificate.tableName} SET work_id = $1, url = $2, product_id = $3 WHERE id = $4 RETURNING *`,
      [work_id, certificate_url, product_id, id]
    );
    return result;
  },

  delete: async (id) => {
    await db.none(`DELETE FROM ${Certificate.tableName} WHERE id = $1`, [id]);
  },
};

module.exports = Certificate;
