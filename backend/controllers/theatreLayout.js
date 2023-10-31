import { theatrelayoutService } from "../service/theatrelayoutService.js";

export async function theatreLayout(req, res) {
  const { theatreid } = req.params;

  const result = await theatrelayoutService(theatreid);
  if (!result || result.length === 0) {
    // If no results were found, return a 404 Not Found response.
    return res.status(404).json({ error: "Salongen hittades inte!" });
  }

  // If results were found, return a 200 OK response with the data.
  res.status(200).json(result);
}
