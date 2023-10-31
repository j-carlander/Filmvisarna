import { ScreeningDetails } from '../ScreeningDetails/ScreeningDetails';

function ScreeningsList({ showScreening }) {


  return (
    <section>
        {showScreening.map((screening, index) => 
            <ScreeningDetails key={index} screening={screening} />
        )}
    </section>
  );
}

export default ScreeningsList;
