import { TsPaintAction } from './ts-paint-action';
import { Color } from '../base/color';
import { TsPaintStoreState } from 'src/app/paint/services/paint.store.state';
import { fillImage } from '../../helpers/image.helpers';
import { PartialActionResult } from './partial-action-result';
import { PasteImageAction } from './paste-image-action';
import { DeselectSelectionAction } from './deselect-selection-action';

export class ClearImageAction extends TsPaintAction {
  constructor() {
    super('image');
    this._deselectsSelection = true;
  }

  protected addPatchesAndDraw(state: TsPaintStoreState): PartialActionResult {
    const backgroundColor: Color = state.secondaryColor;

    const image: ImageData = fillImage(new ImageData(state.image.width, state.image.height), backgroundColor);
    return { image };
  }

  protected getUndoActions(state: TsPaintStoreState): TsPaintAction[] {
    return [new PasteImageAction(state.image), new DeselectSelectionAction()];
  }
}
