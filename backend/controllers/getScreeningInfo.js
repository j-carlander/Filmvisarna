import { screeninginfoService } from '../service/screeninginfoService.js'

export async function getScreeningInfo(req, res) {
    const { movieid } = req.params;
    const result = await screeninginfoService(movieid)
    res.send(result);
}