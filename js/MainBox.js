/**
 * Created by mingnanwu on 5/23/15.
 */
/** @jsx React.DOM */




var ResultRow = React.createClass({
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            <tr>
                <td>{this.props.a}</td>
                <td>{this.props.b}</td>
                <td>{this.props.c}</td>
                <td>{this.props.d}</td>
                <td>{this.props.e}</td>
                <td>{this.props.f}</td>
            </tr>
        );
    }
});

var ResultContainer = React.createClass({
    fetchResults: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.fetchResults();
        setInterval(this.fetchResults, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="resultBox">
                <ResultList data={this.state.data} />
            </div>
        );
    }
});

var ResultList = React.createClass({
    render: function() {
        var resultNode = this.props.data.map(function(result, index) {
            return (
                <ResultRow a={result.a} b={result.b} b={result.b} c={result.c} d={result.d} e={e.Result} key={index}>
                    {result.Result} // dead code?
                </ResultRow>
            );
        });
        return (
            // <div className="ResultList">
            //         {resultNode}
            // </div>
             <table className="center">
                <thead>
                    <tr>
                        <th>a</th>
                        <th>b</th>
                        <th>c</th>
                        <th>d</th>
                        <th>e</th>
                        <th>f</th>
                    </tr>
                </thead>
                <tbody>{resultNode}</tbody>
            </table>
        );
    }
});

React.render(
    <ResultContainer url="/" pollInterval={2000} />,
    document.getElementById('mainBox')
);
