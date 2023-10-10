import { screeninginfoService } from '../service/screeninginfoService.js';

export async function getScreeningInfo(req, res) {
    const { movieid } = req.params;
    const result = await screeninginfoService(movieid);
    if (!result || result.length === 0) {
        // If no results were found, return a 404 Not Found response.
        return res.status(404).send("Movie not found");
    }

    // If results were found, return a 200 OK response with the data.
    res.status(200).json(result);
}