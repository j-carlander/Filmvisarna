INSERT INTO names (name)
VALUES ("Christian Ryltenius"),
("Johan Ulveson"),
("Rachel Mohlin"),
("Éric Besnard"),
("Lambert Wilson"),
("Grégory Gadebois"),
("Marie Gillain"),
("Kenneth Branagh"),
("Jamie Dornan"),
("Michelle Yeoh"),
("Guy Nattiv"),
("Helen Mirren"),
("Liev Schreiber"),
("Camille Cottin"),
("Bill Holderman"),
("Diane Keaton"),
("Jane Fonda"),
("Candice Bergen"),
("Magnus Gertten"),
("Bradley Cooper"),
("Carey Mulligan"),
("Matt Bomer"),
("Charlotte Regan"),
("Lola Campbell"),
("Alin Uzun"),
("Cary Crankson")
;
    
INSERT INTO categories (category)
VALUES ("animerat"),
("biografi"),
("dokumentär")
;
    
INSERT INTO languages (language)
VALUES ("fr")
;
INSERT INTO movies (
        title,
        description,
        trailerlink,
        durationinminutes,
        agelimit,
        directorid,
        releasedate
    )
VALUES (
"Vem är du, Mamma Mu?",
'När Mamma Mu blir inspirerad av barnen och vill göra sin alldeles egna Mu-sikal, råkar hon ställa till det rejält. Lillebrors älskade nalle försvinner under mystiska omständigheter och det är Mamma Mus fel. "Kan du inte bara vara en vanlig ko?" undrar hennes vän Kråkan. "Då händer ingenting!" Men det är ju precis det Mamma Mu vill undvika. Hon älskar när det händer saker! Inte bara så sorgliga saker.',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/YUxc_2i-kK0?si=Cv94T2P82pwcqIWZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
66,
0,
(SELECT id FROM names WHERE name = "Christian Ryltenius"),
"2023-08-25"
),
(
"En frukost på berget",
"Den framgångsrike entreprenören Vincent är högpresterande i alla lägen. Han lever livet i ständig jakt efter nya utmaningar. Så när hans flotta bil bara tvärdör på en bergsväg långt bort från såväl civilisation är stresspåslaget enormt. Han har ju ett schema att hålla! När den oborstade Pierre kommer till Vincents undsättning är hans tacksamhet enorm. Pierre är verkligen hans raka motsats.",
'<iframe width="560" height="315" src="https://www.youtube.com/embed/E4VIqFJ0WC4?si=cJh2qY4gNf-IxEUM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
95,
7,
(SELECT id FROM names WHERE name = "Éric Besnard"),
"2023-09-08"
),
(
"Mord i Venedig",
"Mord i Venedig utspelar sig efter andra världskrigets kyliga Venedig. På självaste allhelgonaafton sker ett skrämmande mysterium, där den berömda detektiven Hercule Poirot befinner sig. Numera pensionerad och i självpåtagen exil i världens mest berömda stad, deltar Poirot motvilligt i en seans i ett förfallet, hemsökt palats. När en av gästerna blir mördad, kastas detektiven in i en ondskefull värld av skuggor och hemligheter",
'<iframe width="560" height="315" src="https://www.youtube.com/embed/AwVCJ7B0Y08?si=CRTmHWeGY5e9grsq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
103,
15,
(SELECT id FROM names WHERE name = "Kenneth Branagh"),
"2023-09-15"
),
(
"Golda",
"Oscarsbelönade Helen Mirren gestaltar Israels premiärminister Golda Meir, som efter Jom kippur-krigets utbrott hösten 1973 plötsligt måste leda en kapplöpning mot tiden för att rädda sitt land. Miljontals liv står på spel, medan Golda tyngs av svåra politiska beslut och av en sjukdom hon försöker förtränga.",
'<iframe width="560" height="315" src="https://www.youtube.com/embed/unW5w6JCEb8?si=W242bQSVO1LjXNKJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
100,
11,
(SELECT id FROM names WHERE name = "Guy Nattiv"),
"2023-10-06"
),
(
"Book Club: The Next Chapter",
"Den hett efterlängtade uppföljaren följer de fyra bästa vännerna när de tar sin bokklubb till Italien för att göra den roliga tjejresa de aldrig gjorde. När saker går åt skogen och hemligheter avslöjas, förändras deras vilsamma semester till en landsomfattande resa som blir deras livs största äventyr.",
'<iframe width="560" height="315" src="https://www.youtube.com/embed/i9k213d5FU0?si=9_IADMAeLLSIUd7m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
108,
0,
(SELECT id FROM names WHERE name = "Bill Holderman"),
"2023-08-18"
),
(
"Somliga går med trasiga skor",
"Snart fyrtio år efter sin död är Cornelis Vreeswijk fortfarande en av svensk musiks största ikoner. Den fattige invandrarkillen från Holland blev folkkär när han moderniserade den svenska visan i mitten på 60-talet. Samtidigt kämpade han hela sitt liv med missbruksproblem och ett stormigt privatliv som ofta hamnade på löpsedlarna. Med hjälp av nyupptäckt arkivmaterial tecknar denna dokumentär ett nära porträtt av en artist som in i det sista ville ge röst åt samhällets svaga och trasiga.",
'<iframe width="560" height="315" src="https://www.youtube.com/embed/ko_-Du0lMF8?si=j0CIQvuuxF4X2Xz-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
105,
11,
(SELECT id FROM names WHERE name = "Magnus Gertten"),
"2023-11-17"
),
(
"Scrapper",
"Trots att hon bara är tolv år klarar Georgie sig helt själv genom att sno cyklar med sin bäste vän Ali. Hemma i lägenheten bygger hon en hemlig värld, med spindlarna som enda sällskap. Efter att hennes mamma gått bort i cancer och pappan passat på att sticka iväg, har Georgie blivit något av en expert på att manipulera alla vuxna som ständigt dyker upp och stör. När pappan plötsligt kommer tillbaka försöker hon köra samma tricks med honom.",
'<iframe width="560" height="315" src="https://www.youtube.com/embed/slyUJ1_eK4E?si=y4FsosZ_HO8hJZ-w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
84,
7,
(SELECT id FROM names WHERE name = "Charlotte Regan"),
"2023-12-01"
),
(
"Maestro",
"En biografi som följer kompositören Leonard Bernstein och äktenskapet med hans hustru Felicia under 25 års tid.",
'<iframe width="560" height="315" src="https://www.youtube.com/embed/o4YHUuJWDRU?si=lN6xQxuF_Z-PqQ37" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
129,
15,
(SELECT id FROM names WHERE name = "Bradley Cooper"),
"2023-12-08"
);

INSERT INTO
    moviecategories (movieid, categoryid)
VALUES (
(SELECT id FROM movies WHERE title = "Maestro"),
(SELECT id FROM categories WHERE category = "biografi")
),
(
(SELECT id FROM movies WHERE title = "Maestro"),
(SELECT id FROM categories WHERE category = "drama")
),
(
(SELECT id FROM movies WHERE title = "Scrapper"),
(SELECT id FROM categories WHERE category = "komedi")
),
(
(SELECT id FROM movies WHERE title = "Scrapper"),
(SELECT id FROM categories WHERE category = "drama")
),
(
(SELECT id FROM movies WHERE title = "Somliga går med trasiga skor"),
(SELECT id FROM categories WHERE category = "dokumentär")
),
(
(SELECT id FROM movies WHERE title = "Book Club: The Next Chapter"),
(SELECT id FROM categories WHERE category = "komedi")
),
(
(SELECT id FROM movies WHERE title = "Golda"),
(SELECT id FROM categories WHERE category = "drama")
),
(
(SELECT id FROM movies WHERE title = "Golda"),
(SELECT id FROM categories WHERE category = "biografi")
),
(
(SELECT id FROM movies WHERE title = "Golda"),
(SELECT id FROM categories WHERE category = "historia")
),
(
(SELECT id FROM movies WHERE title = "Mord i Venedig"),
(SELECT id FROM categories WHERE category = "drama")
),
(
(SELECT id FROM movies WHERE title = "Mord i Venedig"),
(SELECT id FROM categories WHERE category = "crime")
),
(
(SELECT id FROM movies WHERE title = "Mord i Venedig"),
(SELECT id FROM categories WHERE category = "skräck")
),
(
(SELECT id FROM movies WHERE title = "En frukost på berget"),
(SELECT id FROM categories WHERE category = "komedi")
),
(
(SELECT id FROM movies WHERE title = "Vem är du, Mamma Mu?"),
(SELECT id FROM categories WHERE category = "animerat")
),
(
(SELECT id FROM movies WHERE title = "Vem är du, Mamma Mu?"),
(SELECT id FROM categories WHERE category = "barnfilm")
)
;

INSERT INTO movieactors (nameid, movieid)
VALUES (
(SELECT id FROM names WHERE name = "Bradley Cooper"),
(SELECT id FROM movies WHERE title = "Maestro")
),
(
(SELECT id FROM names WHERE name = "Carey Mulligan"),
(SELECT id FROM movies WHERE title = "Maestro")
),
(
(SELECT id FROM names WHERE name = "Matt Bomer"),
(SELECT id FROM movies WHERE title = "Maestro")
),
(
(SELECT id FROM names WHERE name = "Lola Campbell"),
(SELECT id FROM movies WHERE title = "Scrapper")
),
(
(SELECT id FROM names WHERE name = "Alin Uzun"),
(SELECT id FROM movies WHERE title = "Scrapper")
),
(
(SELECT id FROM names WHERE name = "Cary Crankson"),
(SELECT id FROM movies WHERE title = "Scrapper")
),
(
(SELECT id FROM names WHERE name = "Diane Keaton"),
(SELECT id FROM movies WHERE title = "Book Club: The Next Chapter")
),
(
(SELECT id FROM names WHERE name = "Jane Fonda"),
(SELECT id FROM movies WHERE title = "Book Club: The Next Chapter")
),
(
(SELECT id FROM names WHERE name = "Candice Bergen"),
(SELECT id FROM movies WHERE title = "Book Club: The Next Chapter")
),
(
(SELECT id FROM names WHERE name = "Helen Mirren"),
(SELECT id FROM movies WHERE title = "Golda")
),
(
(SELECT id FROM names WHERE name = "Liev Schreiber"),
(SELECT id FROM movies WHERE title = "Golda")
),
(
(SELECT id FROM names WHERE name = "Camille Cottin"),
(SELECT id FROM movies WHERE title = "Golda")
),
(
(SELECT id FROM names WHERE name = "Kenneth Branagh"),
(SELECT id FROM movies WHERE title = "Mord i Venedig")
),
(
(SELECT id FROM names WHERE name = "Jamie Dornan"),
(SELECT id FROM movies WHERE title = "Mord i Venedig")
),
(
(SELECT id FROM names WHERE name = "Michelle Yeoh"),
(SELECT id FROM movies WHERE title = "Mord i Venedig")
),
(
(SELECT id FROM names WHERE name = "Lambert Wilson"),
(SELECT id FROM movies WHERE title = "En frukost på berget")
),
(
(SELECT id FROM names WHERE name = "Grégory Gadebois"),
(SELECT id FROM movies WHERE title = "En frukost på berget")
),
(
(SELECT id FROM names WHERE name = "Marie Gillain"),
(SELECT id FROM movies WHERE title = "En frukost på berget")
),
(
(SELECT id FROM names WHERE name = "Johan Ulveson"),
(SELECT id FROM movies WHERE title = "Vem är du, Mamma Mu?")
),
(
(SELECT id FROM names WHERE name = "Rachel Mohlin"),
(SELECT id FROM movies WHERE title = "Vem är du, Mamma Mu?")
)
;