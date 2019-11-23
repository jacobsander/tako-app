import Attraction from '../model/attraction';
import City from '../model/city';

export const ATTRACTIONS = [
    new Attraction (
        'a1', 
        'Santa Monica Pier',
        'Los Angeles',
        'https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2034&q=80',
        'Lorem Ipsum 1',
        'United States of America'
        ),
    new Attraction (
        'a2',
        'Griffith Observatory',
        'Los Angeles',
        'https://images.unsplash.com/photo-1518533954129-7774297db60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
        'Lorem Ipsum 2',
        'United States of America'
        ),
    new Attraction (
        'a3',
        'Universal Studios',
        'Los Angeles',
        'https://images.unsplash.com/photo-1569789010436-421d71a9fc38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1611&q=80',
        'Lorem Ipsum 3',
        'United States of America'
        ),
];

export const CITIES = [
    new City (
        'c1', 
        'Copenhagen', 
        'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
        ),
    new City (
        'c2',
        'Los Angeles',
        'https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2268&q=80'
        ),
    new City (
        'c3',
        'Tokyo',
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2271&q=80'
        ),
    new City (
        'c4',
        'Guadalajara',
        'https://images.unsplash.com/photo-1563657296501-c3770ae0057b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
        )
];