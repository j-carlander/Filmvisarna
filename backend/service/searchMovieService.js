import { runQuery } from "../db.js";

export async function searchMovieService(q) {
  const query = `%${q}%`;
  const sql = `
select m.id, 
m.title,
group_concat(distinct nact.name separator ', ') as actors,
group_concat(distinct ndir.name separator ', ') as director,
group_concat(distinct c.category separator ', ') as categories
from movies m 
join movieactors ma
on m.id = ma.movieid
join names nact
on ma.nameid = nact.id
join names ndir
on m.directorid = ndir.id
join moviecategories mc
on m.id = mc.movieid
join categories c
on mc.categoryid = c.id 
where m.title like ? 
or nact.name like ?
or ndir.name like ?
or c.category like ?
group by m.title, m.id;
`;

  const result = await runQuery(sql, [query, query, query, query]);
  return result;
}
