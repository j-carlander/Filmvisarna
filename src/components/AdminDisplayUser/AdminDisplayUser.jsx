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
                <p><span>Förnamn:</span> {userResult.fname}</p>
                <p><span>Efternamn:</span> {userResult.lname}</p>
                <p><span>E-post:</span> {userResult.email}</p>
                <p><span>Telefon:</span> {userResult.phone}</p>
                <p><span>Roll:</span> {userResult.role}</p>
        </article>
    )
}