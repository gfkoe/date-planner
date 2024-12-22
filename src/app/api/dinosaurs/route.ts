import data from "./data.json" with { type: "data" };

export async function GET() {
  return Response.json(data);
}
