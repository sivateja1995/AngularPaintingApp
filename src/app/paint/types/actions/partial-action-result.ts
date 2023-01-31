import { TsPaintStoreState } from '../../services/paint.store.state';

export interface PartialActionResult {
  image?: ImageData;
  patches?: Partial<TsPaintStoreState>;
}
