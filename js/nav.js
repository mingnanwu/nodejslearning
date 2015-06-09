

var Navbar = ReactBootstrap.Navbar,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem;


var navbarInstance = (
    <div>
        <Navbar brand='TestBus ResultPage' inverse toggleNavKey={0}>
            <Nav right eventKey={0}> {/* This is the eventKey referenced */}
                <NavItem eventKey={1} href='#'></NavItem>
                <NavItem eventKey={2} href='#'></NavItem>
                <DropdownButton eventKey={3} title=''>
                    <MenuItem eventKey='1'></MenuItem>
                    <MenuItem eventKey='2'></MenuItem>
                    <MenuItem eventKey='3'></MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey='4'></MenuItem>
                </DropdownButton>
            </Nav>
        </Navbar>
    </div>
);

React.render(navbarInstance, document.getElementById('navBar'));