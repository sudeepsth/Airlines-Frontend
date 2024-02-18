import { Layout, Menu, } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Nav = () => {
    const navigate = useNavigate();
    const items = [
        { key: '/', label: 'Home',onClick: () => navigate('/'), },
        { key: 'track-flight', label: 'Track Flight', onClick: () => navigate('/track-flight') },
        // Add more objects as needed
    ];

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
            />
        </Header>
    )
}

export default Nav;