import { useParams } from "react-router-dom";

function AmuletDetail() {
    const { id } = useParams();

    return (
        <div>AmuletDetail {id}</div>
    )
}

export default AmuletDetail;