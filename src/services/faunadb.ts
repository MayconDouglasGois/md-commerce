import faunadb from "faunadb";

const fauna = new faunadb.Client({
  secret: process.env.FAUNADB_API_KEY as string,
});

export {fauna}