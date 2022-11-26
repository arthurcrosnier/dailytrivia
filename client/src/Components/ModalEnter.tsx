function ModalEnter(props: any) {
  return (
    <div className="modal">
      <section className="modal-main">
        <h1 className="modal_welcome_title">How many answers will you find?</h1>
        <p className="modal_welcome_p">
          The aim of the game is to find the answers to the 7 questions of the
          day.
          <br /> the difficulty increases with every question.
          <br />
          <br />
          The game ends when you have used up all your attempts or have answered
          all 7 questions correctly.
          <br />
          <br />
          Your score is calculated according to the number of answers found.
        </p>
        <button
          type="button"
          className="buttonStart modal_welcome_button"
          onClick={props.startClick}
        >
          Start
        </button>
      </section>
    </div>
  );
}

export default ModalEnter;
