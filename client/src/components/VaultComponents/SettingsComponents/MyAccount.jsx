const MyAccount = () => {
    return (
        <>
        <div className="settings-section" id="myaccount">
            <div className="settings-section__header">
                <h2>My Account</h2>
                <hr />
            </div>
            <div className="settings-section__content">
                <form>
                    <label>Name:</label>
                    <input type="text"></input>
                    <label>Email Id:</label>
                    <input type="email"></input>
                    <label>Phone Number:</label>
                    <input type="number"></input>
                    <div className="settings-section__content--button">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
            <br />
            <div className="settings-section__header">
                <h2>Change Email</h2>
                <hr />
            </div>
            <div className="settings-section__content">
                <form>
                    <label>Super Password:</label>
                    <input type="password"></input>
                    <label>New Email Id:</label>
                    <input type="email"></input>
                    <div className="settings-section__content--button">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
            <br />
            <div className="settings-section__header">
                <h2>Change Password</h2>
                <hr />
            </div>
            <div className="settings-section__content">
                <form>
                    <label>Super Password:</label>
                    <input type="password"></input>
                    <label>New Super Password:</label>
                    <input type="password"></input>
                    <label>Confirm Super Password:</label>
                    <input type="password"></input>
                    <div className="settings-section__content--button">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>  
        </>
    )
}

export default MyAccount;