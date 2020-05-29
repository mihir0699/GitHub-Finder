import React from 'react'
import {Link} from 'react-router-dom'
const UserItem = (props) => {

        return (
            <div className="card text-center">
             <img src={props.user.avatar_url} className ="round-img" style={{width:'60px'}}>

             </img>
            <h3>{props.user.login}</h3>
            <div>
                <Link to={`/users/${props.user.login}`} className ="btn btn-dark btn-sm my-1">More</Link>
            </div>
            </div>
        )

}

export default UserItem
