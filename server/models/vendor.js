const db = require("../config/db");

const Vendor = {
  tableName: "vendors",
  columns: {
    id: "id",
    name: "name",
    odooid: "odooid",
  },

  create: async (name, odooid) => {
    const result = await db.one(
      `INSERT INTO ${Vendor.tableName} (name, odooid) VALUES ($1, $2) RETURNING *`,
      [name, odooid]
    );
    return result;
  },

  findAll: async () => {
    const result = await db.any(`SELECT * FROM ${Vendor.tableName}`);
    return result;
  },

  findByName: async (name) => {
    const result = await db.any("SELECT * FROM ${table:name} WHERE name ILIKE ${name}", {
      table: Vendor.tableName,
      name: `%${name}%`,
    });
    return result;
  },
  findById: async (id) => {
    const result = await db.oneOrNone("SELECT * FROM ${table:name} WHERE id = ${id}", {
      table: Vendor.tableName,
      id,
    });
    return result;
  },

  findByOdooId: async (odooid) => {
    const result = await db.oneOrNone(`SELECT * FROM ${Vendor.tableName} WHERE odooid = $1`, [odooid]);
    return result;
  },

  
  findOrCreate: async (odooid, name) => {
    let vendor = await db.oneOrNone(`SELECT * FROM ${Vendor.tableName} WHERE odooid = $1`, [odooid]);

    if (!vendor) {
      vendor = await db.one(`INSERT INTO ${Vendor.tableName} (odooid, name) VALUES ($1, $2) RETURNING *`, [odooid, name]);
    }

    return vendor;
  },
};

module.exports = Vendor;