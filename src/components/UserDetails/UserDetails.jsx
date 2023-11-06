export function UserDetails ({ userinfo }) {

    return (
        <article className="userinfo-card">
            <h3>Hey, {userinfo.fname}!</h3>
            <div className="userinfo-content">
                <p>Förnamn: {userinfo.fname}</p>
                <p>Efternamn: {userinfo.lname}</p>
                <p>E-post: {userinfo.email}</p>
                <p>Telefon nr: {userinfo.phone}</p>
            </div>
        </article>
    )
}