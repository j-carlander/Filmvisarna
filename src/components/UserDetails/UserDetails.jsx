export function UserDetails ({ userinfo }) {

    return (
        <article className="userinfo-card">
            <h3>Hej, {userinfo.fname}!</h3>
            <table className="userinfo-table">
                <tr className="table-content">
                    <th>Förnamn:</th>
                    <td>{userinfo.fname}</td>
                </tr>
                <tr className="table-content">
                    <th>Efternamn:</th> 
                    <td>{userinfo.lname}</td>
                </tr>
                <tr className="table-content">
                    <th>E-post:</th>
                    <td>{userinfo.email}</td>
                </tr>
                <tr className="table-content">
                    <th>Telefon:</th>
                    <td>{userinfo.phone}</td>
                </tr>
            </table>
        </article>
    )
}