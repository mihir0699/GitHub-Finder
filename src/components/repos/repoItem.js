import React from 'react'

const repoItem = ({repo}) => {
    return (
        <div className="card">
            <a href={repo.html_url} target="_blank">{repo.name}</a>
            
        </div>
    )
}

export default repoItem