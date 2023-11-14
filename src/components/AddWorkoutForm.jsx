import React, { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import ExerciseGridForm from "./ExerciseGridForm";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const SubHeader = styled.h3`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #555;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
  color: #444;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #ff6b6b;
  color: #fff;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e74c3c;
  }
`;

const CheckmarkIcon = styled.span`
  margin-left: 5px;
  font-size: 16px;
  color: #ff6b6b;
`;

const SavedWorkout = styled.h3`
  font-size: 16px;
  margin-top: 10px;
`;

const AddWorkoutForm = ({ closeModal, closeStyle }) => {
  const formRef = useRef();
  const focusRef = useRef();
  const fetcher = useFetcher();
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseListIndex, setExerciseListIndex] = useState([]);

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      closeModal();
    }
  }, [isSubmitting]);

  useEffect(() => {
    formRef.current.reset();
    setExerciseList([]);
    setExerciseListIndex([]);
  }, [closeModal]);

  return (
    <Container>
      <CloseButton style={closeStyle} className="close" onClick={closeModal}>
        &times;
      </CloseButton>
      <Header>Create a New Workout Routine</Header>
      <fetcher.Form method="post" ref={formRef}>
        <Label htmlFor="routine_name">Routine Name</Label>
        <Input
          type="text"
          name="routine_name"
          id="routine_name"
          required
          placeholder="Routine Name"
          ref={focusRef}
        />

        <Label htmlFor="descriptions">Routine Description</Label>
        <Input
          type="text"
          name="descriptions"
          id="descriptions"
          required
          placeholder="Routine Description"
        />
        {exerciseList.length > 0 && (
          <SubHeader>
            Saved Workout: {exerciseList.join(", ")}
            <CheckmarkIcon>✔</CheckmarkIcon>
          </SubHeader>
        )}
        <ExerciseGridForm
          exerciseList={exerciseList}
          setExerciseList={setExerciseList}
          exerciseListIndex={exerciseListIndex}
          setExerciseListIndex={setExerciseListIndex}
        />

        <input type="hidden" name="exercise" value={exerciseListIndex} />
        <input type="hidden" name="_action" value="newWorkout" />

        <Button type="submit">
          <span>Create Routine</span>
        </Button>
      </fetcher.Form>
    </Container>
  );
};

export default AddWorkoutForm;
