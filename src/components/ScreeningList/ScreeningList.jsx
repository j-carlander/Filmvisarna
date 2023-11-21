/**
 * Component for listing the screening details
 * ScreeningDetails takes a prop and renders the screening 
 * information in a card format
 */

import { ScreeningDetails } from '../ScreeningDetails/ScreeningDetails';

function ScreeningsList({ showScreening }) {
  return (
    <section>
      {showScreening.length > 0 ? (
        showScreening.map((screening, index) => (
          <ScreeningDetails key={index} screening={screening} />
        ))
      ) : (
        <p>Inga biljetter</p>
      )}
    </section>
  );
}

export default ScreeningsList;
