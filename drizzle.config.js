/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "vpostgresql://AI-Mock_owner:7CwusVP5DtUh@ep-raspy-bonus-a1ta7gw7.ap-southeast-1.aws.neon.tech/AI-Mock?sslmode=require",
  },
};
