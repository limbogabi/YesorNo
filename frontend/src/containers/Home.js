import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [quests, setQuests] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const quests = await loadQuests();
        setQuests(quests);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadQuests() {
    return API.get("quests", "/quests");
  }

  function renderQuestsList(quests) {
    return (
      <>
        <LinkContainer to="/quests/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ms-2 fw-bold">Create a new quest</span>
          </ListGroup.Item>
        </LinkContainer>
        {quests.map(({ questId, content, createdAt }) => (
          <LinkContainer key={questId} to={`/quests/${questId}`}>
            <ListGroup.Item action className="text-nowrap text-truncate">
              <span className="fw-bold">{content.trim().split("\n")[0]}</span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Quests</h1>
        <p className="text-muted">A simple yes or no question app</p>
      </div>
    );
  }

  function renderQuests() {
    return (
      <div className="quests">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Quests</h2>
        <ListGroup>{!isLoading && renderQuestsList(quests)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderQuests() : renderLander()}
    </div>
  );
}