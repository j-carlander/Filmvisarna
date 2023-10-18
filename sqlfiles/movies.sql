INSERT INTO names (name)
VALUES ("Simon Sandquist"),
    ("Wilma Lidén"),
    ("Omar Rudberg"),
    ("Amanda Lindh"),
    ("Aki Kaurismäki"),
    ("Alma Pöysti"),
    ("Jussi Vatanen"),
    ("Alina Tomnikov"),
    ("Janne Hyytiäinen"),
    ("Alberto Rodríguez"),
    ("Miguel Herrán"),
    ("Javier Gutiérrez"),
    ("Woody Allen"),
    ("Owen Wilson"),
    ("Rachel McAdams"),
    ("Marion Cotillard"),
    ("Martin Scorsese"),
    ("Leonardo DiCaprio"),
    ("Brendan Fraser"),
    ("Robert De Niro"),
    ("Jesse Plemons"),
    ("Roger Allers"),
    ("Johan Halldén"),
    ("Frank Ådahl"),
    ("Johan Schinkler");
INSERT INTO categories (category)
VALUES ("skräck"),
    ("drama"),
    ("komedi"),
    ("romantik"),
    ("historia"),
    ("crime"),
    ("barnfilm");
INSERT INTO languages (language)
VALUES ("sv"),
    ("eng"),
    ("fi"),
    ("es");
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
        "Karusell",
        "Parkvärden Fiona ska ta hand om några före detta vänner som vunnit ett exklusivt pris, nämligen privat smygpremiär av halloween på Liseberg. En hel natt ska de få vara helt ensamma på den tomma nöjesparken.",
        '<iframe width=" 560 " height=" 315 " src=" https: / / www.youtube.com / embed / JF3YC - m6Bds ? si = mvtrC - uUir - R_luX " title=" YouTube video player " frameborder=" 0 " allow=" accelerometer; autoplay; clipboard - write; encrypted - media; gyroscope; picture - in - picture; web - share " allowfullscreen></iframe>',
        "80",
        "15",
        (SELECT id
        FROM names
        WHERE name = "Simon Sandquist"),
            "2023-10-20"
    ),
    (
        "Höstlöv som faller",
        "Filmen utspelar sig i Helsingfors och kretsar kring två ensamma främlingar, Ansa och Holappa, som möts i natten på jakt efter kärlek. Men alkoholism, borttappade telefonnummer och att inte ens veta varandras namn kanske står i vägen.",
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/AI3IASNvKeQ?si=z9-gbwTiKLbFVb6P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        "81",
        "11",
        (SELECT id
        FROM names
        WHERE name = "Aki Kaurismäki"),
            "2023-10-13"
    ),
    (
        "Prison 77",
        "Unge revisorn Manuel blir inslängd i ett nedgånget fängelse i Barcelona efter ett mindre brott. Alberto Rodríguez verklighetsbaserade fängelsedrama Prison 77 utspelar sig när fascismens diktatur i Spanien går mot sitt slut i mitten på 70-talet. Manuel riskerar att bli kvar längre än rimligt, medan världen utanför murarna långsamt förändras genom några stapplande steg mot demokrati.",
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/L_e8Dp0b_Lg?si=PkvYVbqvuCciT6Nt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        "125",
        "11",
        (SELECT id
        FROM names
        WHERE name = "Alberto Rodríguez"),
            "2023-10-13"
    ),
    (
        "Midnatt i Paris",
        "En romantisk komedi från 2011. Amerikanske Gil och hans fästmö Inez som reser till Paris tillsammans med hennes föräldrar. Inez är mest intresserad av att shoppa och roa sig men hos Gil väcker Paris glömda minnen och han blir allt mer övertygad om att den väg han valt i livet inte är den rätta för honom. En rad oväntade händelser ställer allting på sin spets och snart är ingenting sig likt.",
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/FAfR8omt-CY?si=YIgPfda5PfUm_Mbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        "90",
        "11",
        (SELECT id
        FROM names
        WHERE name = "Woody Allen"),
            "2023-10-02"
    ),
    (
        "Killers of the Flower Moon",
        '"Killers of the Flower Moon", baserad på David Granns hyllade bästsäljande bok, utspelar sig i 1920-talets Oklahoma och skildrar seriemord på ursprungsbefolkningen i den oljerika Osage Nation, en serie brutala brott som kom att kallas ”Reign of Terror”.',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/7cx9nCHsemc?si=Ne5HlOkmXsG3AUiC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        "206",
        "15",
        (SELECT id
        FROM names
        WHERE name = "Martin Scorsese"),
            "2023-10-20"
    ),
    (
        "Lejonkungen",
        'En klassisk barnfilm från 1994. Det unga lejonet Simba som knappt kan vänta på att bli kung, lever ett ansvarslöst liv med sina festliga kompisar Timon och Pumbaa och glömmer sina kungliga plikter. Men ödet kallar och han måste avgöra när tidpunkten är den rätta att återvända till Lejonriket och återta sin plats i ”Livets cirkel”.',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/lFzVJEksoDY?si=2jsLXAN3tVgj9i6G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        "88",
        "0",
        (SELECT id
        FROM names
        WHERE name = "Roger Allers"),
            "2023-10-10"
    );