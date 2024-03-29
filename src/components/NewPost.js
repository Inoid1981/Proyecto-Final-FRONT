import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendPostService } from "../services";

export const NewPost = ({ addPost }) => {

    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();
    const { token } = useContext(AuthContext);
    
    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setSending(true);

            const data = new FormData(e.target);
            const post = await sendPostService({ data, token });
console.log(data)
            addPost(post);
            e.target.reset();
            setImage(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };
    return (
        <form onSubmit={handleForm}>
            <h1>Add new Post</h1>

            <fieldset>
                <label htmlFor="text">Text and hastag(optional)</label>
                <input type="text" id="text" name="text" />
            </fieldset>

            <fieldset>
                <label htmlFor="image">Post</label>
                <input type="file" id="image" name="image" accept="image/*" 
                onChange={(e) => setImage(e.target.files[0])} required />
                {image ? <figure>
                    <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: "100px" }} />
                </figure> : null}
            </fieldset>

            <button>Send Post</button>
            {sending ? <p>Sending Post</p> : null}
            {error ? <p>{error}</p> : null}
        </form>
    );
};
