/**
 * Component for user information details
 * takes a prop and renders the information in a card format
 */

export function UserDetails ({ userinfo }) {

    return (
        <article className="userinfo-card">
            <h3>Hej, {userinfo.fname}!</h3>
            <table className="userinfo-table">
                <tbody>
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
                </tbody>
                
            </table>
        </article>
    )
}