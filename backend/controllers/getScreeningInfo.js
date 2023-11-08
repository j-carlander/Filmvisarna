import {
  screeningInfoById,
  screeninginfoService,
} from "../service/screeninginfoService.js";
import { formatDateTimeSwe } from "../utils/formatDateTime.js";

export async function getScreeningInfo(req, res) {
  const { page } = req.query;
  const { movieid } = req.params;
  const result = await screeninginfoService(movieid, page);
  if (page !== undefined && isNaN(Number(page))) {
    return res.status(400).json({ error: "Page är inte en siffra!" });
  }
  if (!result || result.length === 0) {
    // If no results were found, return a 404 Not Found response.
    return res.status(404).json({ error: "Filmen hittades inte!" });
  }

  for (let screening of result) {
    screening.screeningDate = formatDateTimeSwe(screening.screeningDate);
  }

  // If results were found, return a 200 OK response with the data.
  res.status(200).json(result);
}

export async function screeningById(req, res) {
  const { screeningid } = req.params;

  const result = await screeningInfoById(screeningid);

  if (result.length === 0)
    return res.status(400).send({
      message: "Visningen hittades inte eller så är visningen för gammal!",
    });
  const screening = result[0];

  const screeningEndDate = new Date(screening.screeningDate);

  screeningEndDate.setTime(
    screeningEndDate.getTime() + screening.durationinminutes * 60 * 1000
  );

  screening.endTime = formatDateTimeSwe(screeningEndDate);

  screening.screeningDate = formatDateTimeSwe(screening.screeningDate);

  res.send(screening);
}
