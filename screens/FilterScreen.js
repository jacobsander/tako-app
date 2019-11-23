import React, {useState} from 'react'
import {View, Text, StyleSheet, Switch} from 'react-native'

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer} >
        <Switch 
        trackColor={{true: "blue"}}
        style={styles.switchContainer}
        value={props.state} onValueChange={props.onChange}
        />
        <Text>{props.label}</Text>
    </View>
    );   
}

const FilterScreen = () => {
    const [hasCulture, setHasCulture] = useState(false);
    const [hasSports, setHasSports] = useState(false);
    const [hasRomantic, setHasRomantic] = useState(false);
    const [hasShopping, setHasShopping] = useState(false);
    const [hasAdventure, setHasAdventure] = useState(false);
    const [hasParty, setHasParty] = useState(false);
    const [hasNature, setHasNature] = useState(false);
    const [hasPhotography, setHasPhotography] = useState(false);
    const [hasFood, setHasFood] = useState(false);
    const [hasLuxury, setHasLuxury] = useState(false);

    return(
        <View style={styles.container}>
            <View style={styles.styleContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Available Filters</Text>
            </View>

                <FilterSwitch 
                label='Cuture'
                state={hasCulture}
                onChange={newValue => setHasCulture(newValue)}
                />
                <FilterSwitch 
                label='Sports'
                state={hasSports}
                onChange={newValue => setHasSports(newValue)}
                />
                <FilterSwitch 
                label='Romantic'
                state={hasRomantic}
                onChange={newValue => setHasRomantic(newValue)}
                />
                <FilterSwitch 
                label='Shopping'
                state={hasShopping}
                onChange={newValue => setHasShopping(newValue)}
                />
                <FilterSwitch 
                label='Adventure'
                state={hasAdventure}
                onChange={newValue => setHasAdventure(newValue)}
                />
                <FilterSwitch 
                label='Party'
                state={hasParty}
                onChange={newValue => setHasParty(newValue)}
                />
                <FilterSwitch 
                label='Nature'
                state={hasNature}
                onChange={newValue => setHasNature(newValue)}
                />
                <FilterSwitch 
                label='Photography'
                state={hasPhotography}
                onChange={newValue => setHasPhotography(newValue)}
                />
                <FilterSwitch 
                label='Food'
                state={hasFood}
                onChange={newValue => setHasFood(newValue)}
                />
                <FilterSwitch 
                label='Luxury'
                state={hasLuxury}
                onChange={newValue => setHasLuxury(newValue)}
                />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    styleContainer: {
        width: "55%",
        
    },
    headerContainer: {
        flexDirection: "row",
        marginBottom: 50,
        justifyContent: "center",
        alignItems: "center"

    },
    switchContainer: {
        marginRight: 30
    },
    title: {
        textAlign: "center",
        fontSize: 25,
    },
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    }
})

export default FilterScreen;