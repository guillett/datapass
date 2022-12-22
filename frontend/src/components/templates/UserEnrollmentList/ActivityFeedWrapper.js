import { chain } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { STATUS_LABELS } from '../../../config/status-parameters';
import { getCachedMajorityPercentileProcessingTimeInDays } from '../../../services/stats';
import Alert from '../../atoms/Alert';
import { EventItem } from '../../organisms/form-sections/HeadSection/ActivityFeed';

const ActivityFeedWrapper = ({ events, status, target_api }) => {
  const [
    majorityPercentileProcessingTimeInDays,
    setMajorityPercentileTimeInDays,
  ] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const {
        data: { majority_percentile_processing_time_in_days },
      } = await getCachedMajorityPercentileProcessingTimeInDays(target_api);
      setMajorityPercentileTimeInDays(
        majority_percentile_processing_time_in_days
      );
    }

    if (status === 'submitted') {
      fetchStats();
    }
  }, [status, target_api]);

  const {
    comment = '',
    name: lastEventName = '',
    updated_at = '',
    user: { email = '', given_name, family_name } = {},
    diff,
  } = useMemo(
    () => chain(events).sortBy('updated_at').last().value() || {},
    [events]
  );

  if (
    ['draft', 'changes_requested'].includes(status) &&
    ['request_changes'].includes(lastEventName)
  ) {
    return (
      <Alert title={STATUS_LABELS[status]} type="warning">
        Votre demande d’habilitation est incomplète et requiert les
        modifications suivantes :
        <div style={{ margin: '1rem 0' }}>
          <EventItem
            comment={comment}
            name={lastEventName}
            updated_at={updated_at}
            email={email}
            given_name={given_name}
            family_name={family_name}
            diff={diff}
          />
        </div>
      </Alert>
    );
  }

  if (
    ['draft', 'changes_requested'].includes(status) &&
    ['create', 'update'].includes(lastEventName)
  ) {
    return (
      <Alert title={STATUS_LABELS[status]}>
        <p>
          Votre demande d’habilitation est actuellement en cours d’édition.
          Notre service juridique pourra la consulter lorsque vous cliquerez sur
          "Soumettre la demande d’habilitation".
        </p>
      </Alert>
    );
  }

  if (status === 'submitted' && majorityPercentileProcessingTimeInDays > 0) {
    return (
      <Alert title={STATUS_LABELS[status]}>
        La majorité des demandes d’habilitation des 6 derniers mois reçoivent
        une réponse en moins de{' '}
        <b>{majorityPercentileProcessingTimeInDays} jours</b>.
      </Alert>
    );
  }

  return null;
};

ActivityFeedWrapper.propTypes = {
  events: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  target_api: PropTypes.string.isRequired,
};

export default ActivityFeedWrapper;
