export function AdminDisplayUser({ userResult }){

    if (!userResult) return;

  if ("error" in userResult) {
    return (
      <article>
        <p>{userResult.error}</p>
      </article>
    );
  }
    return (
        <article className="admin-display-userinfo">
            <h2>Resultat för sökning:</h2>
            <p>Förnamn: {userResult.fname}</p>
            <p>Efternamn: {userResult.lname}</p>
            <p>E-post: {userResult.email}</p>
            <p>Telefon: {userResult.phone}</p>
            <p>Roll: {userResult.role}</p>
        </article>
    )
}