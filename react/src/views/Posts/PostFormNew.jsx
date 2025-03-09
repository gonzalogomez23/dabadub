import { useEffect, useState } from "react";
import PrimaryButton from "components/PrimaryButton";
import { useStateContext } from "contexts/ContextProvider";

const PostFormNew = ({initialValues, onSubmit, isUpdateMode}) => {

    const [postData, setPostData] = useState(initialValues);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileSelect = (event) => {
        event.preventDefault();
    
        const file = event.target?.files?.[0] || event.dataTransfer?.files?.[0];
        if (!file) return;
    
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setPostData(prevData => ({ ...prevData, image: file }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setPostData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
    
        const data = {
            title: postData.title,
            description: postData.description,
            content: postData.content,
            published: postData.published,
            ...(isUpdateMode && { _method: "PUT" })
        };
    
        if (!image) return onSubmit(data);
    
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        formData.append("image", image);
    
        return onSubmit(formData);
    };

    return (
        <form
            className="max-w-full flex flex-col items-start gap-5"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2 w-full">
                {initialValues.image && (
                    <div className="mb-4">
                        <p className="mb-2">Current image:</p>
                        <div className="">
                            <img src={initialValues.image} alt="Current image" className=" rounded-lg aspect-video object-cover max-w-80 w-full" />
                        </div>
                    </div>
                )}
                <label htmlFor="imageUpload">Upload new image</label>
                <div
                    id="imageUpload"
                    className="w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                    onDrop={handleFileSelect}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById("fileInput").click()}
                    aria-describedby="imageHelp"
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className=" max-w-80 w-full aspect-video object-cover rounded-lg" />
                    ) : (
                        <p className="text-gray-500">Drag & Drop an image or click to upload</p>
                    )}
                </div>
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/jpg, image/png, image/jpeg, image/webp"
                    onChange={handleFileSelect}
                />
                <p id="imageHelp" className="text-gray-500 text-sm">
                    Accepted formats: jpg, jpeg, png, webp
                </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    defaultValue={postData.title || ""}
                    onBlur={handleBlur}
                    placeholder="Title"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={postData.description || ""}
                    onBlur={handleBlur}
                    placeholder="Description"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="content">Content</label>
                <textarea
                id="content"
                name="content"
                defaultValue={postData.content || ""}
                onBlur={handleBlur}
                placeholder="Content"
                className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            {/* <div className="flex items-center gap-2">
                <input
                    id="published"
                    name="published"
                    defaultValue={postData.published || true}
                    onChange={ev => setPostData({...postData, published: ev.target.checked})}
                    type="checkbox"
                    defaultChecked={true}
                />
                <label htmlFor="published">Published</label>
            </div> */}
            <PrimaryButton className="btn-add" type="submit">
                Save
            </PrimaryButton>
        </form>
    );
};

export default PostFormNew;
