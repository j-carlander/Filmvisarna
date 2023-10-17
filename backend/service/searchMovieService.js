import { runQuery } from "../db.js";

export async function searchMovieService(q) {
  const query = `%${q}%`;
  const sql = `
select m.title,
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
group by m.title;
`;

  const result = await runQuery(sql, [query, query, query, query]);
  return result;
}

// const sql = `
// select m.title,
// group_concat(distinct nact.name separator ', ') as actors,
// group_concat(distinct ndir.name separator ', ') as director,
// group_concat(distinct c.category separator ', ') as categories
// from movies m
// join movieactors ma
// on m.id = ma.movieid
// join names nact
// on ma.nameid = nact.id
// join names ndir
// on m.directorid = ndir.id
// join moviecategories mc
// on m.id = mc.movieid
// join categories c
// on mc.categoryid = c.id
// where m.title like '%jo%'
// or nact.name like '%jo%'
// or ndir.name like '%jo%'
// or c.category like '%jo%'
// group by m.title;
// `

// const sql = `
// SELECT title
// FROM movies
// WHERE title LIKE ? ;
//   `;
