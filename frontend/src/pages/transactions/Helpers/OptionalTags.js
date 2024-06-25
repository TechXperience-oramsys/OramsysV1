import React from 'react';

const OptionalSpan = () => (
  <span className='text-muted fw-lighter fst-italic font-bold ps-2'>(optional)</span>
);

const RequiredSpan = () => (
  <span className='text-danger fs-6'>*</span>
);

export { OptionalSpan, RequiredSpan };
