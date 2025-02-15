import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {Cast, Codepen, Codesandbox, Database} from 'react-feather'
import {useState} from 'react'
import Levels from './Levels'
import Technology from './technology/Technology'
import Status from './statuse/Status'
import Term from './term/Term'


export default function Tabs() {
    //
    const [active, setActive] = useState('1')

    function toggleTab(tab) {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                        <Codesandbox className="font-medium-3 me-50" />
                        <span className="fw-bold">سطوح </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                        <Codepen className="font-medium-3 me-50" />
                        <span className="fw-bold">فناوری ها</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                        <Database className="font-medium-3 me-50" />
                        <span className="fw-bold">استاتوس </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                        <Cast className="font-medium-3 me-50" />
                        <span className="fw-bold">ترم </span>
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <Levels />
                </TabPane>
                <TabPane tabId="2">
                    <Technology/>
                </TabPane>
                <TabPane tabId="3">
                    <Status/>
                </TabPane>
                <TabPane tabId="4">
                    <Term/>
                </TabPane>
            </TabContent>
        </>
    )
}
