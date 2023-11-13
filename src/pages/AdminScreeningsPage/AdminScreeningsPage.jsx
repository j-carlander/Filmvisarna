import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchHelper } from "../../utils/fetchHelper";
import { useState } from "react";
import { AdminScreeningCard } from "../../components/AdminScreeningCard/AdminScreeningCard";

export function AdminScreeningsPage() {
    const [screenings, setScreenings] = useState([])
    const [deleteMessage, setDeleteMessage] = useState("");
    const { movieid } = useParams();

    useEffect(() => {
        async function getAllScreenings() {
            const url = `/moviescreenings/${movieid}`
            const response = await fetchHelper(url, "get")
            const data = await response.json();
            setScreenings(data);
            console.log(data)
        }
        getAllScreenings();
    }, [movieid])

    const handleDeleteScreening = (deletedScreeningId) => {
        setScreenings((prevScreenings) =>
          prevScreenings.filter((screening) => screening.id !== deletedScreeningId)
        );

        setDeleteMessage("Visning tagits bort!");

        setTimeout(() => {
          setDeleteMessage("");
        }, 3000);
    };
    
    return (
        <div className="adminscreenings-wrapper">
            {screenings.map((screening, index) => (
                <AdminScreeningCard key={index} screening={screening} onDeleteScreening={handleDeleteScreening} />
            ))}
            {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
        </div>
    )
}