import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/useForm";
import "./PlaceForm.css";

const PLACES = [
    {
        id: "p1",
        title: "Rakitovica",
        description: "Selo u kojem se sve moguce",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Rakitovica.jpg/1200px-Rakitovica.jpg",
        address: "Croatia",
        location: {
            lat: 45.7187104,
            lng: 18.159498,
        },
        creator: "u1",
    },
    {
        id: "p2",
        title: "Rakitovica2",
        description: "Selo u kojem se sve moguce",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Rakitovica.jpg/1200px-Rakitovica.jpg",
        address: "Croatia",
        location: {
            lat: 45.7187104,
            lng: 18.159498,
        },
        creator: "u2",
    },
];

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const identifiedPlace = PLACES.find((p) => p.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace.title,
                        isValid: true,
                    },
                    description: {
                        value: identifiedPlace.description,
                        isValid: true,
                    },
                },
                true
            );
        }

        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    const placeUpdateSubtmiHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading</h2>
            </div>
        );
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubtmiHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description min 5 chars"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Update Place
            </Button>
        </form>
    );
};

export default UpdatePlace;
