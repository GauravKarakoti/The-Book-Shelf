import { useEffect, useState } from "react";
import AdminLayout from "../../../../hoc/adminLayout"
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminPosts = (props) => {
    let [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/books/all_books?ownerId=${props.user.userData.id}`)
            .then(response => {
                setPosts(response.data);
            });
    },[props]);
    console.log(posts);
    return (
        <AdminLayout>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Rating</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Link to={`/admin/posts/edit/${item._id}`}>{item.name}</Link>
                                </TableCell>
                                <TableCell>{item.author}</TableCell>
                                <TableCell>{moment(item.createdAt).format("MM/DD/YY")}</TableCell>
                                <TableCell>{item.rating}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    )
}
export default AdminPosts;
