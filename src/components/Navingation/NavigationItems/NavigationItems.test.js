import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

describe('<NavigationItems />', () => {
    let wrapper;
    let authWrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
        authWrapper = shallow(<NavigationItems isAuthenticated />)
    })

    it('should render 2 <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render 3 <NavigationItem /> elements if authenticated', () => {
        //passing down props to the wrapper set in beforeEach
        // wrapper.setProps({isAuthenticated: true})
        expect(authWrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should render specific Logout element with /logout path', () => {
        // wrapper.setProps({isAuthenticated: true})
        expect(authWrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})