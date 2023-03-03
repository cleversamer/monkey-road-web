import Details from "v2/components/car-details/rent";

const Details1 = ({ car, onNext, onAccept, onReject }) => {
  return (
    <Details
      car={car}
      onNext={onNext}
      onAccept={onAccept}
      onReject={onReject}
    />
  );
};

export default Details1;
