
function UserList({users}){
    return <ul data-testid="users">
        {users.map(({name, email}, i) => (<li key={i}>
            <div>
                name: <span role="cell">{name}</span>
            </div>
            <div>
                email: <span role="cell">{email}</span>
            </div>
        </li>))}
    </ul>
}
export default UserList