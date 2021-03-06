var Link = React.createClass({
    render: function () {
        return (
            <a href={this.props.url} onClick={this.props.handleClick}>{this.props.title}</a>
        );
    }
});

var TableRow = React.createClass({
    handleDeleteUser: function () {
        this.props.handleDeleteUser(this.props.data.id, this.props.rowIndex);
    },
    render: function () {
        return (
            <tr className={this.props.rowStyle}>
                <td>{this.props.data.firstName}</td>
                <td>{this.props.data.lastName}</td>
                <td>{this.props.data.username}</td>
                <td>{this.props.data.email}</td>
                <td></td>
                <td></td>
                <td><Link title="Delete" handleClick={this.handleDeleteUser} url="#"/></td>
            </tr>
        );
    }

});

var Header = React.createClass({
    render: function () {
        return (
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Details</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
        );
    }

});

var Table = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },
    componentDidMount: function () {
        this.loadData();
    },
    loadData: function () {
        var url = "/test/users";
        jQuery.ajax({
            url: url,
            data: null,
            success: function (data) {
                this.setState({
                    data: data
                });
            }.bind(this),
        });
    },
    handleDeleteUser: function (id, index) {
        var deleteUrl = "/test/users/delete/" + id;
        jQuery.ajax({
            url: deleteUrl,
            data: null,
            success: function () {
                var data = this.state.data;
                data.splice(index, 1);
                this.setState({
                    data: this.state.data
                })
            }.bind(this),
        });
    },
    render: function () {

        return (
            <div className='table'>
                <table>
                    <Header/>
                    <tbody>
                    {this.state.data.map((user, i) => <TableRow key={i} rowIndex={i} data={user}
                                                                rowStyle={i%2==0?'tableRow-even':'tableRow-odd'}
                                                                handleDeleteUser={this.handleDeleteUser}/>)}
                    </tbody>
                </table>
            </div>
        );
    }

});

var Main = React.createClass({
    render: function () {
        return (
            <div>
                <Table/>
                <div>
                <Link title="New user" url=""/>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('container')
);
