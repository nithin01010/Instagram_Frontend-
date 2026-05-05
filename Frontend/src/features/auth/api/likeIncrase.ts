import { root } from './config';

const likecount = async (postid : string) => {
    const res = await fetch(root + 'likecount/'+ {postid},{
        method : "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        credentials: 'include'
    })
    if (!res.ok){
        alert("Unable to like");
        return;
    }
}

export default likecount;