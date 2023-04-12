/**
 * 交互器
 */
ui.RateInteractor = function (comp) {
    ui.RateInteractor.superClass.constructor.call(this, comp);
}

def(ui.RateInteractor, ui.Interactor, {
    handle_mousemove: function (e) {
        this.handle_touchmove(e);
    },
    handle_touchmove: function (e) {
        var self = this;

        Default.preventDefault(e);
        var rate = self.getComponent(),
            gap = rate.getIconGap(),
            allowHalf = rate.isAllowHalf(),
            iconRects = rate.iconRects,
            lp = rate.lp(e),
            readOnly = rate.isReadOnly();

        var hoverValue = 0;
        for(var i = 0, len = iconRects.length; i < len; i++) {
            var rect = iconRects[i].rect;
            if (!readOnly && Default.containsPoint(rect, lp)) {
                rate.setCursor('pointer');
                if(allowHalf && Default.containsPoint({
                    x: rect.x,
                    y: rect.y,
                    width: i === len - 1 ? rect.width / 2 : (rect.width - gap) / 2,
                    height: rect.height
                }, lp)) hoverValue = i + 0.5;
                else hoverValue = i + 1;
                break;
            }
            else {
                rate.setCursor('default');
            }
        }

        if (hoverValue !== rate.getHoverValue()) {
            rate.setHoverValue(hoverValue);
        }
    },
    handle_mousedown: function (e) {
        this.handle_touchstart(e);
    },
    handle_touchstart: function (e) {
        var self = this;

        Default.preventDefault(e);
        if (ht.Default.isLeftButton(e)) {
            var rate = self.getComponent(),
                gap = rate.getIconGap(),
                allowHalf = rate.isAllowHalf(),
                iconRects = rate.iconRects,
                lp = rate.lp(e),
                readOnly = rate.isReadOnly(),
                clearable = rate.isClearable(),
                oldValue = rate.getValue();

            for(var i = 0, len = iconRects.length; i < len; i++) {
                var rect = iconRects[i].rect;
                var value;
                if (!readOnly && Default.containsPoint(rect, lp)) {
                    if(allowHalf && Default.containsPoint({
                        x: rect.x,
                        y: rect.y,
                        width: i === len - 1 ? rect.width / 2 : (rect.width - gap) / 2,
                        height: rect.height
                    }, lp)) {
                        value = i + 0.5;
                    }
                    else value = i + 1;

                    if (clearable && value === oldValue) {
                        rate.setHoverValue(0);
                        rate.setValue(0);
                    }
                    else rate.setValue(value);
                    break;
                }
            }
        }
    },
    handle_mouseout: function(e) {
        var self = this;

        var rate = self.getComponent();
        
        rate.setHoverValue(0);
    }
});