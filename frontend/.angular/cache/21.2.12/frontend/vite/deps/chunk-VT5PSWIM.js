import {
  BaseEditableHolder
} from "./chunk-XE236Z6L.js";
import {
  ConnectedOverlayScrollHandler
} from "./chunk-NT4GFUOH.js";
import {
  zindexutils
} from "./chunk-3WXT4SWY.js";
import {
  CheckIcon,
  MinusIcon
} from "./chunk-DOGRCXAL.js";
import {
  BaseComponent,
  PARENT_INSTANCE
} from "./chunk-QYH6NNR2.js";
import {
  Bind,
  BindModule
} from "./chunk-V5T3XRTC.js";
import {
  BaseStyle
} from "./chunk-QRVUDZLH.js";
import {
  PrimeTemplate,
  SharedModule
} from "./chunk-7JBD4HTO.js";
import {
  $,
  C,
  D,
  Jt,
  L,
  Z,
  k,
  k2,
  q,
  q2,
  s2 as s,
  ut,
  y2 as y,
  yt
} from "./chunk-7AAYTGB2.js";
import {
  NG_VALUE_ACCESSOR,
  NgControl
} from "./chunk-C7RXTPDO.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-US7DSN2V.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-273ZE7P4.js";
import {
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/styles/dist/checkbox/index.mjs
var style = "\n    .p-checkbox {\n        position: relative;\n        display: inline-flex;\n        user-select: none;\n        vertical-align: bottom;\n        width: dt('checkbox.width');\n        height: dt('checkbox.height');\n    }\n\n    .p-checkbox-input {\n        cursor: pointer;\n        appearance: none;\n        position: absolute;\n        inset-block-start: 0;\n        inset-inline-start: 0;\n        width: 100%;\n        height: 100%;\n        padding: 0;\n        margin: 0;\n        opacity: 0;\n        z-index: 1;\n        outline: 0 none;\n        border: 1px solid transparent;\n        border-radius: dt('checkbox.border.radius');\n    }\n\n    .p-checkbox-box {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        border-radius: dt('checkbox.border.radius');\n        border: 1px solid dt('checkbox.border.color');\n        background: dt('checkbox.background');\n        width: dt('checkbox.width');\n        height: dt('checkbox.height');\n        transition:\n            background dt('checkbox.transition.duration'),\n            color dt('checkbox.transition.duration'),\n            border-color dt('checkbox.transition.duration'),\n            box-shadow dt('checkbox.transition.duration'),\n            outline-color dt('checkbox.transition.duration');\n        outline-color: transparent;\n        box-shadow: dt('checkbox.shadow');\n    }\n\n    .p-checkbox-icon {\n        transition-duration: dt('checkbox.transition.duration');\n        color: dt('checkbox.icon.color');\n        font-size: dt('checkbox.icon.size');\n        width: dt('checkbox.icon.size');\n        height: dt('checkbox.icon.size');\n    }\n\n    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        border-color: dt('checkbox.hover.border.color');\n    }\n\n    .p-checkbox-checked .p-checkbox-box {\n        border-color: dt('checkbox.checked.border.color');\n        background: dt('checkbox.checked.background');\n    }\n\n    .p-checkbox-checked .p-checkbox-icon {\n        color: dt('checkbox.icon.checked.color');\n    }\n\n    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        background: dt('checkbox.checked.hover.background');\n        border-color: dt('checkbox.checked.hover.border.color');\n    }\n\n    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {\n        color: dt('checkbox.icon.checked.hover.color');\n    }\n\n    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n        border-color: dt('checkbox.focus.border.color');\n        box-shadow: dt('checkbox.focus.ring.shadow');\n        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');\n        outline-offset: dt('checkbox.focus.ring.offset');\n    }\n\n    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n        border-color: dt('checkbox.checked.focus.border.color');\n    }\n\n    .p-checkbox.p-invalid > .p-checkbox-box {\n        border-color: dt('checkbox.invalid.border.color');\n    }\n\n    .p-checkbox.p-variant-filled .p-checkbox-box {\n        background: dt('checkbox.filled.background');\n    }\n\n    .p-checkbox-checked.p-variant-filled .p-checkbox-box {\n        background: dt('checkbox.checked.background');\n    }\n\n    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        background: dt('checkbox.checked.hover.background');\n    }\n\n    .p-checkbox.p-disabled {\n        opacity: 1;\n    }\n\n    .p-checkbox.p-disabled .p-checkbox-box {\n        background: dt('checkbox.disabled.background');\n        border-color: dt('checkbox.checked.disabled.border.color');\n    }\n\n    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {\n        color: dt('checkbox.icon.disabled.color');\n    }\n\n    .p-checkbox-sm,\n    .p-checkbox-sm .p-checkbox-box {\n        width: dt('checkbox.sm.width');\n        height: dt('checkbox.sm.height');\n    }\n\n    .p-checkbox-sm .p-checkbox-icon {\n        font-size: dt('checkbox.icon.sm.size');\n        width: dt('checkbox.icon.sm.size');\n        height: dt('checkbox.icon.sm.size');\n    }\n\n    .p-checkbox-lg,\n    .p-checkbox-lg .p-checkbox-box {\n        width: dt('checkbox.lg.width');\n        height: dt('checkbox.lg.height');\n    }\n\n    .p-checkbox-lg .p-checkbox-icon {\n        font-size: dt('checkbox.icon.lg.size');\n        width: dt('checkbox.icon.lg.size');\n        height: dt('checkbox.icon.lg.size');\n    }\n";

// node_modules/primeng/fesm2022/primeng-checkbox.mjs
var _c0 = ["icon"];
var _c1 = ["input"];
var _c2 = (a0, a1, a2) => ({
  checked: a0,
  class: a1,
  dataP: a2
});
function Checkbox_ng_container_3_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("icon"));
    ɵɵproperty("ngClass", ctx_r0.checkboxIcon)("pBind", ctx_r0.ptm("icon"));
    ɵɵattribute("data-p", ctx_r0.dataP);
  }
}
function Checkbox_ng_container_3_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 9);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("icon"));
    ɵɵproperty("pBind", ctx_r0.ptm("icon"));
    ɵɵattribute("data-p", ctx_r0.dataP);
  }
}
function Checkbox_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Checkbox_ng_container_3_ng_container_1_span_1_Template, 1, 5, "span", 6)(2, Checkbox_ng_container_3_ng_container_1__svg_svg_2_Template, 1, 4, "svg", 7);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.checkboxIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.checkboxIcon);
  }
}
function Checkbox_ng_container_3__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 10);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("icon"));
    ɵɵproperty("pBind", ctx_r0.ptm("icon"));
    ɵɵattribute("data-p", ctx_r0.dataP);
  }
}
function Checkbox_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Checkbox_ng_container_3_ng_container_1_Template, 3, 2, "ng-container", 3)(2, Checkbox_ng_container_3__svg_svg_2_Template, 1, 4, "svg", 5);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.checked);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0._indeterminate());
  }
}
function Checkbox_4_ng_template_0_Template(rf, ctx) {
}
function Checkbox_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Checkbox_4_ng_template_0_Template, 0, 0, "ng-template");
  }
}
var style2 = (
  /*css*/
  `
    ${style}

    /* For PrimeNG */
    p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
    p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
    p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }
`
);
var classes = {
  root: ({
    instance
  }) => ["p-checkbox p-component", {
    "p-checkbox-checked p-highlight": instance.checked,
    "p-disabled": instance.$disabled(),
    "p-invalid": instance.invalid(),
    "p-variant-filled": instance.$variant() === "filled",
    "p-checkbox-sm p-inputfield-sm": instance.size() === "small",
    "p-checkbox-lg p-inputfield-lg": instance.size() === "large"
  }],
  box: "p-checkbox-box",
  input: "p-checkbox-input",
  icon: "p-checkbox-icon"
};
var CheckboxStyle = class _CheckboxStyle extends BaseStyle {
  name = "checkbox";
  style = style2;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵCheckboxStyle_BaseFactory;
    return function CheckboxStyle_Factory(__ngFactoryType__) {
      return (ɵCheckboxStyle_BaseFactory || (ɵCheckboxStyle_BaseFactory = ɵɵgetInheritedFactory(_CheckboxStyle)))(__ngFactoryType__ || _CheckboxStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _CheckboxStyle,
    factory: _CheckboxStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxStyle, [{
    type: Injectable
  }], null, null);
})();
var CheckboxClasses;
(function(CheckboxClasses2) {
  CheckboxClasses2["root"] = "p-checkbox";
  CheckboxClasses2["box"] = "p-checkbox-box";
  CheckboxClasses2["input"] = "p-checkbox-input";
  CheckboxClasses2["icon"] = "p-checkbox-icon";
})(CheckboxClasses || (CheckboxClasses = {}));
var CHECKBOX_INSTANCE = new InjectionToken("CHECKBOX_INSTANCE");
var CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Checkbox),
  multi: true
};
var Checkbox = class _Checkbox extends BaseEditableHolder {
  componentName = "Checkbox";
  hostName = "";
  /**
   * Value of the checkbox.
   * @group Props
   */
  value;
  /**
   * Allows to select a boolean value instead of multiple values.
   * @group Props
   */
  binary;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Used to define a string that labels the input element.
   * @group Props
   */
  ariaLabel;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex;
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId;
  /**
   * Inline style of the input element.
   * @group Props
   */
  inputStyle;
  /**
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Style class of the input element.
   * @group Props
   */
  inputClass;
  /**
   * When present, it specifies input state as indeterminate.
   * @group Props
   */
  indeterminate = false;
  /**
   * Form control value.
   * @group Props
   */
  formControl;
  /**
   * Icon class of the checkbox icon.
   * @group Props
   */
  checkboxIcon;
  /**
   * When present, it specifies that the component cannot be edited.
   * @group Props
   */
  readonly;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * Value in checked state.
   * @group Props
   */
  trueValue = true;
  /**
   * Value in unchecked state.
   * @group Props
   */
  falseValue = false;
  /**
   * Specifies the input variant of the component.
   * @defaultValue undefined
   * @group Props
   */
  variant = input(...ngDevMode ? [void 0, {
    debugName: "variant"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Specifies the size of the component.
   * @defaultValue undefined
   * @group Props
   */
  size = input(...ngDevMode ? [void 0, {
    debugName: "size"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Callback to invoke on value change.
   * @param {CheckboxChangeEvent} event - Custom value change event.
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke when the receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when the loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  inputViewChild;
  get checked() {
    return this._indeterminate() ? false : this.binary ? this.modelValue() === this.trueValue : q(this.value, this.modelValue());
  }
  _indeterminate = signal(void 0, ...ngDevMode ? [{
    debugName: "_indeterminate"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Custom checkbox icon template.
   * @group Templates
   */
  checkboxIconTemplate;
  templates;
  _checkboxIconTemplate;
  focused = false;
  _componentStyle = inject(CheckboxStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcCheckbox = inject(CHECKBOX_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant(), ...ngDevMode ? [{
    debugName: "$variant"
  }] : (
    /* istanbul ignore next */
    []
  ));
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "icon":
          this._checkboxIconTemplate = item.template;
          break;
        case "checkboxicon":
          this._checkboxIconTemplate = item.template;
          break;
      }
    });
  }
  onChanges(changes) {
    if (changes.indeterminate) {
      this._indeterminate.set(changes.indeterminate.currentValue);
    }
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  updateModel(event) {
    let newModelValue;
    const selfControl = this.injector.get(NgControl, null, {
      optional: true,
      self: true
    });
    const currentModelValue = selfControl && !this.formControl ? selfControl.value : this.modelValue();
    if (!this.binary) {
      if (this.checked || this._indeterminate()) newModelValue = currentModelValue.filter((val) => !k(val, this.value));
      else newModelValue = currentModelValue ? [...currentModelValue, this.value] : [this.value];
      this.onModelChange(newModelValue);
      this.writeModelValue(newModelValue);
      if (this.formControl) {
        this.formControl.setValue(newModelValue);
      }
    } else {
      newModelValue = this._indeterminate() ? this.trueValue : this.checked ? this.falseValue : this.trueValue;
      this.writeModelValue(newModelValue);
      this.onModelChange(newModelValue);
    }
    if (this._indeterminate()) {
      this._indeterminate.set(false);
    }
    this.onChange.emit({
      checked: newModelValue,
      originalEvent: event
    });
  }
  handleChange(event) {
    if (!this.readonly) {
      this.updateModel(event);
    }
  }
  onInputFocus(event) {
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    this.onBlur.emit(event);
    this.onModelTouched();
  }
  focus() {
    this.inputViewChild?.nativeElement.focus();
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    setModelValue(value);
    this.cd.markForCheck();
  }
  get dataP() {
    return this.cn({
      invalid: this.invalid(),
      checked: this.checked,
      disabled: this.$disabled(),
      filled: this.$variant() === "filled",
      [this.size()]: this.size()
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵCheckbox_BaseFactory;
    return function Checkbox_Factory(__ngFactoryType__) {
      return (ɵCheckbox_BaseFactory || (ɵCheckbox_BaseFactory = ɵɵgetInheritedFactory(_Checkbox)))(__ngFactoryType__ || _Checkbox);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Checkbox,
    selectors: [["p-checkbox"], ["p-checkBox"], ["p-check-box"]],
    contentQueries: function Checkbox_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.checkboxIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Checkbox_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.inputViewChild = _t.first);
      }
    },
    hostVars: 6,
    hostBindings: function Checkbox_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-p-highlight", ctx.checked)("data-p-checked", ctx.checked)("data-p-disabled", ctx.$disabled())("data-p", ctx.dataP);
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      hostName: "hostName",
      value: "value",
      binary: [2, "binary", "binary", booleanAttribute],
      ariaLabelledBy: "ariaLabelledBy",
      ariaLabel: "ariaLabel",
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      inputId: "inputId",
      inputStyle: "inputStyle",
      styleClass: "styleClass",
      inputClass: "inputClass",
      indeterminate: [2, "indeterminate", "indeterminate", booleanAttribute],
      formControl: "formControl",
      checkboxIcon: "checkboxIcon",
      readonly: [2, "readonly", "readonly", booleanAttribute],
      autofocus: [2, "autofocus", "autofocus", booleanAttribute],
      trueValue: "trueValue",
      falseValue: "falseValue",
      variant: [1, "variant"],
      size: [1, "size"]
    },
    outputs: {
      onChange: "onChange",
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    features: [ɵɵProvidersFeature([CHECKBOX_VALUE_ACCESSOR, CheckboxStyle, {
      provide: CHECKBOX_INSTANCE,
      useExisting: _Checkbox
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Checkbox
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 5,
    vars: 26,
    consts: [["input", ""], ["type", "checkbox", 3, "focus", "blur", "change", "checked", "pBind"], [3, "pBind"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["data-p-icon", "minus", 3, "class", "pBind", 4, "ngIf"], [3, "class", "ngClass", "pBind", 4, "ngIf"], ["data-p-icon", "check", 3, "class", "pBind", 4, "ngIf"], [3, "ngClass", "pBind"], ["data-p-icon", "check", 3, "pBind"], ["data-p-icon", "minus", 3, "pBind"]],
    template: function Checkbox_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "input", 1, 0);
        ɵɵlistener("focus", function Checkbox_Template_input_focus_0_listener($event) {
          return ctx.onInputFocus($event);
        })("blur", function Checkbox_Template_input_blur_0_listener($event) {
          return ctx.onInputBlur($event);
        })("change", function Checkbox_Template_input_change_0_listener($event) {
          return ctx.handleChange($event);
        });
        ɵɵelementEnd();
        ɵɵelementStart(2, "div", 2);
        ɵɵtemplate(3, Checkbox_ng_container_3_Template, 3, 2, "ng-container", 3)(4, Checkbox_4_Template, 1, 0, null, 4);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵstyleMap(ctx.inputStyle);
        ɵɵclassMap(ctx.cn(ctx.cx("input"), ctx.inputClass));
        ɵɵproperty("checked", ctx.checked)("pBind", ctx.ptm("input"));
        ɵɵattribute("id", ctx.inputId)("value", ctx.value)("name", ctx.name())("tabindex", ctx.tabindex)("required", ctx.required() ? "" : void 0)("readonly", ctx.readonly ? "" : void 0)("disabled", ctx.$disabled() ? "" : void 0)("aria-labelledby", ctx.ariaLabelledBy)("aria-label", ctx.ariaLabel);
        ɵɵadvance(2);
        ɵɵclassMap(ctx.cx("box"));
        ɵɵproperty("pBind", ctx.ptm("box"));
        ɵɵattribute("data-p", ctx.dataP);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.checkboxIconTemplate && !ctx._checkboxIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.checkboxIconTemplate || ctx._checkboxIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction3(22, _c2, ctx.checked, ctx.cx("icon"), ctx.dataP));
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, SharedModule, CheckIcon, MinusIcon, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Checkbox, [{
    type: Component,
    args: [{
      selector: "p-checkbox, p-checkBox, p-check-box",
      standalone: true,
      imports: [CommonModule, SharedModule, CheckIcon, MinusIcon, BindModule],
      template: `
        <input
            #input
            [attr.id]="inputId"
            type="checkbox"
            [attr.value]="value"
            [attr.name]="name()"
            [checked]="checked"
            [attr.tabindex]="tabindex"
            [attr.required]="required() ? '' : undefined"
            [attr.readonly]="readonly ? '' : undefined"
            [attr.disabled]="$disabled() ? '' : undefined"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-label]="ariaLabel"
            [style]="inputStyle"
            [class]="cn(cx('input'), inputClass)"
            [pBind]="ptm('input')"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="handleChange($event)"
        />
        <div [class]="cx('box')" [pBind]="ptm('box')" [attr.data-p]="dataP">
            <ng-container *ngIf="!checkboxIconTemplate && !_checkboxIconTemplate">
                <ng-container *ngIf="checked">
                    <span *ngIf="checkboxIcon" [class]="cx('icon')" [ngClass]="checkboxIcon" [pBind]="ptm('icon')" [attr.data-p]="dataP"></span>
                    <svg data-p-icon="check" *ngIf="!checkboxIcon" [class]="cx('icon')" [pBind]="ptm('icon')" [attr.data-p]="dataP" />
                </ng-container>
                <svg data-p-icon="minus" *ngIf="_indeterminate()" [class]="cx('icon')" [pBind]="ptm('icon')" [attr.data-p]="dataP" />
            </ng-container>
            <ng-template *ngTemplateOutlet="checkboxIconTemplate || _checkboxIconTemplate; context: { checked: checked, class: cx('icon'), dataP: dataP }"></ng-template>
        </div>
    `,
      providers: [CHECKBOX_VALUE_ACCESSOR, CheckboxStyle, {
        provide: CHECKBOX_INSTANCE,
        useExisting: Checkbox
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Checkbox
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "cn(cx('root'), styleClass)",
        "[attr.data-p-highlight]": "checked",
        "[attr.data-p-checked]": "checked",
        "[attr.data-p-disabled]": "$disabled()",
        "[attr.data-p]": "dataP"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    hostName: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    binary: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    inputId: [{
      type: Input
    }],
    inputStyle: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    inputClass: [{
      type: Input
    }],
    indeterminate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    formControl: [{
      type: Input
    }],
    checkboxIcon: [{
      type: Input
    }],
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    trueValue: [{
      type: Input
    }],
    falseValue: [{
      type: Input
    }],
    variant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "variant",
        required: false
      }]
    }],
    size: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "size",
        required: false
      }]
    }],
    onChange: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    inputViewChild: [{
      type: ViewChild,
      args: ["input"]
    }],
    checkboxIconTemplate: [{
      type: ContentChild,
      args: ["icon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var CheckboxModule = class _CheckboxModule {
  static ɵfac = function CheckboxModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CheckboxModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _CheckboxModule,
    imports: [Checkbox, SharedModule],
    exports: [Checkbox, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Checkbox, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxModule, [{
    type: NgModule,
    args: [{
      imports: [Checkbox, SharedModule],
      exports: [Checkbox, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/iconfield/index.mjs
var style3 = "\n    .p-iconfield {\n        position: relative;\n        display: block;\n    }\n\n    .p-inputicon {\n        position: absolute;\n        top: 50%;\n        margin-top: calc(-1 * (dt('icon.size') / 2));\n        color: dt('iconfield.icon.color');\n        line-height: 1;\n        z-index: 1;\n    }\n\n    .p-iconfield .p-inputicon:first-child {\n        inset-inline-start: dt('form.field.padding.x');\n    }\n\n    .p-iconfield .p-inputicon:last-child {\n        inset-inline-end: dt('form.field.padding.x');\n    }\n\n    .p-iconfield .p-inputtext:not(:first-child),\n    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {\n        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-iconfield .p-inputtext:not(:last-child) {\n        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {\n        font-size: dt('form.field.sm.font.size');\n        width: dt('form.field.sm.font.size');\n        height: dt('form.field.sm.font.size');\n        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));\n    }\n\n    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {\n        font-size: dt('form.field.lg.font.size');\n        width: dt('form.field.lg.font.size');\n        height: dt('form.field.lg.font.size');\n        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));\n    }\n";

// node_modules/primeng/fesm2022/primeng-iconfield.mjs
var _c02 = ["*"];
var classes2 = {
  root: ({
    instance
  }) => ["p-iconfield", {
    "p-iconfield-left": instance.iconPosition == "left",
    "p-iconfield-right": instance.iconPosition == "right"
  }]
};
var IconFieldStyle = class _IconFieldStyle extends BaseStyle {
  name = "iconfield";
  style = style3;
  classes = classes2;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵIconFieldStyle_BaseFactory;
    return function IconFieldStyle_Factory(__ngFactoryType__) {
      return (ɵIconFieldStyle_BaseFactory || (ɵIconFieldStyle_BaseFactory = ɵɵgetInheritedFactory(_IconFieldStyle)))(__ngFactoryType__ || _IconFieldStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _IconFieldStyle,
    factory: _IconFieldStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconFieldStyle, [{
    type: Injectable
  }], null, null);
})();
var IconFieldClasses;
(function(IconFieldClasses2) {
  IconFieldClasses2["root"] = "p-iconfield";
})(IconFieldClasses || (IconFieldClasses = {}));
var ICONFIELD_INSTANCE = new InjectionToken("ICONFIELD_INSTANCE");
var IconField = class _IconField extends BaseComponent {
  componentName = "IconField";
  hostName = "";
  _componentStyle = inject(IconFieldStyle);
  $pcIconField = inject(ICONFIELD_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Position of the icon.
   * @group Props
   */
  iconPosition = "left";
  /**
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵIconField_BaseFactory;
    return function IconField_Factory(__ngFactoryType__) {
      return (ɵIconField_BaseFactory || (ɵIconField_BaseFactory = ɵɵgetInheritedFactory(_IconField)))(__ngFactoryType__ || _IconField);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _IconField,
    selectors: [["p-iconfield"], ["p-iconField"], ["p-icon-field"]],
    hostVars: 2,
    hostBindings: function IconField_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      hostName: "hostName",
      iconPosition: "iconPosition",
      styleClass: "styleClass"
    },
    features: [ɵɵProvidersFeature([IconFieldStyle, {
      provide: ICONFIELD_INSTANCE,
      useExisting: _IconField
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _IconField
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c02,
    decls: 1,
    vars: 0,
    template: function IconField_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconField, [{
    type: Component,
    args: [{
      selector: "p-iconfield, p-iconField, p-icon-field",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: ` <ng-content></ng-content>`,
      providers: [IconFieldStyle, {
        provide: ICONFIELD_INSTANCE,
        useExisting: IconField
      }, {
        provide: PARENT_INSTANCE,
        useExisting: IconField
      }],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class]": "cn(cx('root'), styleClass)"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    hostName: [{
      type: Input
    }],
    iconPosition: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }]
  });
})();
var IconFieldModule = class _IconFieldModule {
  static ɵfac = function IconFieldModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IconFieldModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _IconFieldModule,
    imports: [IconField],
    exports: [IconField]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [IconField]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconFieldModule, [{
    type: NgModule,
    args: [{
      imports: [IconField],
      exports: [IconField]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-inputicon.mjs
var _c03 = ["*"];
var classes3 = {
  root: "p-inputicon"
};
var InputIconStyle = class _InputIconStyle extends BaseStyle {
  name = "inputicon";
  classes = classes3;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputIconStyle_BaseFactory;
    return function InputIconStyle_Factory(__ngFactoryType__) {
      return (ɵInputIconStyle_BaseFactory || (ɵInputIconStyle_BaseFactory = ɵɵgetInheritedFactory(_InputIconStyle)))(__ngFactoryType__ || _InputIconStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _InputIconStyle,
    factory: _InputIconStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIconStyle, [{
    type: Injectable
  }], null, null);
})();
var INPUTICON_INSTANCE = new InjectionToken("INPUTICON_INSTANCE");
var InputIcon = class _InputIcon extends BaseComponent {
  componentName = "InputIcon";
  hostName = "";
  /**
   * Style class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  _componentStyle = inject(InputIconStyle);
  $pcInputIcon = inject(INPUTICON_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputIcon_BaseFactory;
    return function InputIcon_Factory(__ngFactoryType__) {
      return (ɵInputIcon_BaseFactory || (ɵInputIcon_BaseFactory = ɵɵgetInheritedFactory(_InputIcon)))(__ngFactoryType__ || _InputIcon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _InputIcon,
    selectors: [["p-inputicon"], ["p-inputIcon"]],
    hostVars: 2,
    hostBindings: function InputIcon_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      hostName: "hostName",
      styleClass: "styleClass"
    },
    features: [ɵɵProvidersFeature([InputIconStyle, {
      provide: INPUTICON_INSTANCE,
      useExisting: _InputIcon
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _InputIcon
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c03,
    decls: 1,
    vars: 0,
    template: function InputIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, SharedModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIcon, [{
    type: Component,
    args: [{
      selector: "p-inputicon, p-inputIcon",
      standalone: true,
      imports: [CommonModule, SharedModule, BindModule],
      template: `<ng-content></ng-content>`,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [InputIconStyle, {
        provide: INPUTICON_INSTANCE,
        useExisting: InputIcon
      }, {
        provide: PARENT_INSTANCE,
        useExisting: InputIcon
      }],
      hostDirectives: [Bind],
      host: {
        "[class]": "cn(cx('root'), styleClass)"
      }
    }]
  }], null, {
    hostName: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }]
  });
})();
var InputIconModule = class _InputIconModule {
  static ɵfac = function InputIconModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputIconModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputIconModule,
    imports: [InputIcon, SharedModule],
    exports: [InputIcon, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [InputIcon, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIconModule, [{
    type: NgModule,
    args: [{
      imports: [InputIcon, SharedModule],
      exports: [InputIcon, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/tooltip/index.mjs
var style4 = "\n    .p-tooltip {\n        position: absolute;\n        display: none;\n        max-width: dt('tooltip.max.width');\n    }\n\n    .p-tooltip-right,\n    .p-tooltip-left {\n        padding: 0 dt('tooltip.gutter');\n    }\n\n    .p-tooltip-top,\n    .p-tooltip-bottom {\n        padding: dt('tooltip.gutter') 0;\n    }\n\n    .p-tooltip-text {\n        white-space: pre-line;\n        word-break: break-word;\n        background: dt('tooltip.background');\n        color: dt('tooltip.color');\n        padding: dt('tooltip.padding');\n        box-shadow: dt('tooltip.shadow');\n        border-radius: dt('tooltip.border.radius');\n    }\n\n    .p-tooltip-arrow {\n        position: absolute;\n        width: 0;\n        height: 0;\n        border-color: transparent;\n        border-style: solid;\n    }\n\n    .p-tooltip-right .p-tooltip-arrow {\n        margin-top: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter') 0;\n        border-right-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-left .p-tooltip-arrow {\n        margin-top: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') 0 dt('tooltip.gutter') dt('tooltip.gutter');\n        border-left-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-top .p-tooltip-arrow {\n        margin-left: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') dt('tooltip.gutter') 0 dt('tooltip.gutter');\n        border-top-color: dt('tooltip.background');\n        border-bottom-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-bottom .p-tooltip-arrow {\n        margin-left: calc(-1 * dt('tooltip.gutter'));\n        border-width: 0 dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter');\n        border-top-color: dt('tooltip.background');\n        border-bottom-color: dt('tooltip.background');\n    }\n";

// node_modules/primeng/fesm2022/primeng-tooltip.mjs
var classes4 = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
};
var TooltipStyle = class _TooltipStyle extends BaseStyle {
  name = "tooltip";
  style = style4;
  classes = classes4;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTooltipStyle_BaseFactory;
    return function TooltipStyle_Factory(__ngFactoryType__) {
      return (ɵTooltipStyle_BaseFactory || (ɵTooltipStyle_BaseFactory = ɵɵgetInheritedFactory(_TooltipStyle)))(__ngFactoryType__ || _TooltipStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TooltipStyle,
    factory: _TooltipStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipStyle, [{
    type: Injectable
  }], null, null);
})();
var TooltipClasses;
(function(TooltipClasses2) {
  TooltipClasses2["root"] = "p-tooltip";
  TooltipClasses2["arrow"] = "p-tooltip-arrow";
  TooltipClasses2["text"] = "p-tooltip-text";
})(TooltipClasses || (TooltipClasses = {}));
var TOOLTIP_INSTANCE = new InjectionToken("TOOLTIP_INSTANCE");
var Tooltip = class _Tooltip extends BaseComponent {
  zone;
  viewContainer;
  componentName = "Tooltip";
  $pcTooltip = inject(TOOLTIP_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition;
  /**
   * Event to show the tooltip.
   * @group Props
   */
  tooltipEvent = "hover";
  /**
   * Type of CSS position.
   * @group Props
   */
  positionStyle;
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass;
  /**
   * Whether the z-index should be managed automatically to always go on top or have a fixed value.
   * @group Props
   */
  tooltipZIndex;
  /**
   * By default the tooltip contents are rendered as text. Set to false to support html tags in the content.
   * @group Props
   */
  escape = true;
  /**
   * Delay to show the tooltip in milliseconds.
   * @group Props
   */
  showDelay;
  /**
   * Delay to hide the tooltip in milliseconds.
   * @group Props
   */
  hideDelay;
  /**
   * Time to wait in milliseconds to hide the tooltip even it is active.
   * @group Props
   */
  life;
  /**
   * Specifies the additional vertical offset of the tooltip from its default position.
   * @group Props
   */
  positionTop;
  /**
   * Specifies the additional horizontal offset of the tooltip from its default position.
   * @group Props
   */
  positionLeft;
  /**
   * Whether to hide tooltip when hovering over tooltip content.
   * @group Props
   */
  autoHide = true;
  /**
   * Automatically adjusts the element position when there is not enough space on the selected position.
   * @group Props
   */
  fitContent = true;
  /**
   * Whether to hide tooltip on escape key press.
   * @group Props
   */
  hideOnEscape = true;
  /**
   * Whether to show the tooltip only when the target text overflows (e.g., ellipsis is active).
   * @group Props
   */
  showOnEllipsis = false;
  /**
   * Content of the tooltip.
   * @group Props
   */
  content;
  /**
   * When present, it specifies that the component should be disabled.
   * @defaultValue false
   * @group Props
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
    this.deactivate();
  }
  /**
   * Specifies the tooltip configuration options for the component.
   * @group Props
   */
  tooltipOptions;
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : (
    /* istanbul ignore next */
    []
  ));
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : (
    /* istanbul ignore next */
    []
  ));
  _tooltipOptions = {
    tooltipLabel: null,
    tooltipPosition: "right",
    tooltipEvent: "hover",
    appendTo: "body",
    positionStyle: null,
    tooltipStyleClass: null,
    tooltipZIndex: "auto",
    escape: true,
    disabled: null,
    showDelay: null,
    hideDelay: null,
    positionTop: null,
    positionLeft: null,
    life: null,
    autoHide: true,
    hideOnEscape: true,
    showOnEllipsis: false,
    id: s("pn_id_") + "_tooltip"
  };
  _disabled;
  container;
  styleClass;
  tooltipText;
  rootPTClasses = "";
  showTimeout;
  hideTimeout;
  active;
  mouseEnterListener;
  mouseLeaveListener;
  containerMouseleaveListener;
  clickListener;
  focusListener;
  blurListener;
  touchStartListener;
  touchEndListener;
  documentTouchListener;
  documentEscapeListener;
  scrollHandler;
  resizeListener;
  _componentStyle = inject(TooltipStyle);
  interactionInProgress = false;
  /**
   * Used to pass attributes to DOM elements inside the Tooltip component.
   * @defaultValue undefined
   * @deprecated use pTooltipPT instead.
   * @group Props
   */
  ptTooltip = input(...ngDevMode ? [void 0, {
    debugName: "ptTooltip"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Used to pass attributes to DOM elements inside the Tooltip component.
   * @defaultValue undefined
   * @group Props
   */
  pTooltipPT = input(...ngDevMode ? [void 0, {
    debugName: "pTooltipPT"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pTooltipUnstyled = input(...ngDevMode ? [void 0, {
    debugName: "pTooltipUnstyled"
  }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(zone, viewContainer) {
    super();
    this.zone = zone;
    this.viewContainer = viewContainer;
    effect(() => {
      const pt = this.ptTooltip() || this.pTooltipPT();
      pt && this.directivePT.set(pt);
    });
    effect(() => {
      this.pTooltipUnstyled() && this.directiveUnstyled.set(this.pTooltipUnstyled());
    });
  }
  onAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        const tooltipEvent = this.getOption("tooltipEvent");
        if (tooltipEvent === "hover" || tooltipEvent === "both") {
          this.mouseEnterListener = this.onMouseEnter.bind(this);
          this.mouseLeaveListener = this.onMouseLeave.bind(this);
          this.clickListener = this.onInputClick.bind(this);
          this.el.nativeElement.addEventListener("mouseenter", this.mouseEnterListener);
          this.el.nativeElement.addEventListener("click", this.clickListener);
          this.el.nativeElement.addEventListener("mouseleave", this.mouseLeaveListener);
          this.touchStartListener = this.onTouchStart.bind(this);
          this.touchEndListener = this.onTouchEnd.bind(this);
          this.el.nativeElement.addEventListener("touchstart", this.touchStartListener, {
            passive: true
          });
          this.el.nativeElement.addEventListener("touchend", this.touchEndListener, {
            passive: true
          });
        }
        if (tooltipEvent === "focus" || tooltipEvent === "both") {
          this.focusListener = this.onFocus.bind(this);
          this.blurListener = this.onBlur.bind(this);
          let target = this.el.nativeElement.querySelector(".p-component");
          if (!target) {
            target = this.getTarget(this.el.nativeElement);
          }
          target.addEventListener("focus", this.focusListener);
          target.addEventListener("blur", this.blurListener);
        }
      });
    }
  }
  onChanges(simpleChange) {
    if (simpleChange.tooltipPosition) {
      this.setOption({
        tooltipPosition: simpleChange.tooltipPosition.currentValue
      });
    }
    if (simpleChange.tooltipEvent) {
      this.setOption({
        tooltipEvent: simpleChange.tooltipEvent.currentValue
      });
    }
    if (simpleChange.appendTo) {
      this.setOption({
        appendTo: simpleChange.appendTo.currentValue
      });
    }
    if (simpleChange.positionStyle) {
      this.setOption({
        positionStyle: simpleChange.positionStyle.currentValue
      });
    }
    if (simpleChange.tooltipStyleClass) {
      this.setOption({
        tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue
      });
    }
    if (simpleChange.tooltipZIndex) {
      this.setOption({
        tooltipZIndex: simpleChange.tooltipZIndex.currentValue
      });
    }
    if (simpleChange.escape) {
      this.setOption({
        escape: simpleChange.escape.currentValue
      });
    }
    if (simpleChange.showDelay) {
      this.setOption({
        showDelay: simpleChange.showDelay.currentValue
      });
    }
    if (simpleChange.hideDelay) {
      this.setOption({
        hideDelay: simpleChange.hideDelay.currentValue
      });
    }
    if (simpleChange.life) {
      this.setOption({
        life: simpleChange.life.currentValue
      });
    }
    if (simpleChange.positionTop) {
      this.setOption({
        positionTop: simpleChange.positionTop.currentValue
      });
    }
    if (simpleChange.positionLeft) {
      this.setOption({
        positionLeft: simpleChange.positionLeft.currentValue
      });
    }
    if (simpleChange.disabled) {
      this.setOption({
        disabled: simpleChange.disabled.currentValue
      });
    }
    if (simpleChange.content) {
      this.setOption({
        tooltipLabel: simpleChange.content.currentValue
      });
      if (this.active) {
        if (simpleChange.content.currentValue) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
    if (simpleChange.autoHide) {
      this.setOption({
        autoHide: simpleChange.autoHide.currentValue
      });
    }
    if (simpleChange.showOnEllipsis) {
      this.setOption({
        showOnEllipsis: simpleChange.showOnEllipsis.currentValue
      });
    }
    if (simpleChange.id) {
      this.setOption({
        id: simpleChange.id.currentValue
      });
    }
    if (simpleChange.tooltipOptions) {
      this._tooltipOptions = __spreadValues(__spreadValues({}, this._tooltipOptions), simpleChange.tooltipOptions.currentValue);
      this.deactivate();
      if (this.active) {
        if (this.getOption("tooltipLabel")) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
  }
  isAutoHide() {
    return this.getOption("autoHide");
  }
  onMouseEnter(e) {
    if (!this.container && !this.showTimeout) {
      this.activate();
    }
  }
  onMouseLeave(e) {
    if (!this.isAutoHide()) {
      const valid = k2(e.relatedTarget, "p-tooltip") || k2(e.relatedTarget, "p-tooltip-text") || k2(e.relatedTarget, "p-tooltip-arrow");
      !valid && this.deactivate();
    } else {
      this.deactivate();
    }
  }
  onTouchStart(e) {
    if (!this.container && !this.showTimeout) {
      this.activate();
      if (!this.isAutoHide()) {
        this.bindDocumentTouchListener();
      }
    }
  }
  onTouchEnd(e) {
    if (this.isAutoHide()) {
      this.deactivate();
    }
  }
  bindDocumentTouchListener() {
    if (!this.documentTouchListener) {
      this.documentTouchListener = this.renderer.listen("document", "touchstart", (e) => {
        if (this.container && !this.container.contains(e.target) && !this.el.nativeElement.contains(e.target)) {
          this.deactivate();
          this.unbindDocumentTouchListener();
        }
      });
    }
  }
  unbindDocumentTouchListener() {
    if (this.documentTouchListener) {
      this.documentTouchListener();
      this.documentTouchListener = null;
    }
  }
  onFocus(e) {
    this.activate();
  }
  onBlur(e) {
    this.deactivate();
  }
  onInputClick(e) {
    this.deactivate();
  }
  hasEllipsis() {
    const el = this.el.nativeElement;
    return el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight;
  }
  activate() {
    if (!this.interactionInProgress) {
      if (this.getOption("showOnEllipsis") && !this.hasEllipsis()) {
        return;
      }
      this.active = true;
      this.clearHideTimeout();
      if (this.getOption("showDelay")) this.showTimeout = setTimeout(() => {
        this.show();
      }, this.getOption("showDelay"));
      else this.show();
      if (this.getOption("life")) {
        let duration = this.getOption("showDelay") ? this.getOption("life") + this.getOption("showDelay") : this.getOption("life");
        this.hideTimeout = setTimeout(() => {
          this.hide();
        }, duration);
      }
      if (this.getOption("hideOnEscape")) {
        this.documentEscapeListener = this.renderer.listen("document", "keydown.escape", () => {
          this.deactivate();
          this.documentEscapeListener?.();
        });
      }
      this.interactionInProgress = true;
    }
  }
  deactivate() {
    this.interactionInProgress = false;
    this.active = false;
    this.clearShowTimeout();
    if (this.getOption("hideDelay")) {
      this.clearHideTimeout();
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, this.getOption("hideDelay"));
    } else {
      this.hide();
    }
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
    }
  }
  create() {
    if (this.container) {
      this.clearHideTimeout();
      this.remove();
    }
    this.container = q2("div", {
      class: this.cx("root"),
      "p-bind": this.ptm("root"),
      "data-pc-section": "root"
    });
    this.container.setAttribute("role", "tooltip");
    let tooltipArrow = q2("div", {
      class: this.cx("arrow"),
      "p-bind": this.ptm("arrow"),
      "data-pc-section": "arrow"
    });
    this.container.appendChild(tooltipArrow);
    this.tooltipText = q2("div", {
      class: this.cx("text"),
      "p-bind": this.ptm("text"),
      "data-pc-section": "text"
    });
    this.updateText();
    if (this.getOption("positionStyle")) {
      this.container.style.position = this.getOption("positionStyle");
    }
    this.container.appendChild(this.tooltipText);
    if (this.getOption("appendTo") === "body") document.body.appendChild(this.container);
    else if (this.getOption("appendTo") === "target") ut(this.container, this.el.nativeElement);
    else ut(this.getOption("appendTo"), this.container);
    this.container.style.display = "none";
    if (this.fitContent) {
      this.container.style.width = "fit-content";
    }
    if (this.isAutoHide()) {
      this.container.style.pointerEvents = "none";
    } else {
      this.container.style.pointerEvents = "unset";
      this.bindContainerMouseleaveListener();
    }
  }
  bindContainerMouseleaveListener() {
    if (!this.containerMouseleaveListener) {
      const targetEl = this.container ?? this.container.nativeElement;
      this.containerMouseleaveListener = this.renderer.listen(targetEl, "mouseleave", (e) => {
        this.deactivate();
      });
    }
  }
  unbindContainerMouseleaveListener() {
    if (this.containerMouseleaveListener) {
      this.bindContainerMouseleaveListener();
      this.containerMouseleaveListener = null;
    }
  }
  show() {
    if (!this.getOption("tooltipLabel") || this.getOption("disabled")) {
      return;
    }
    this.create();
    const nativeElement = this.el.nativeElement;
    const pDialogWrapper = nativeElement.closest("p-dialog");
    if (pDialogWrapper) {
      setTimeout(() => {
        this.container && (this.container.style.display = "inline-block");
        this.container && this.align();
      }, 100);
    } else {
      this.container.style.display = "inline-block";
      this.align();
    }
    yt(this.container, 250);
    if (this.getOption("tooltipZIndex") === "auto") zindexutils.set("tooltip", this.container, this.config.zIndex.tooltip);
    else this.container.style.zIndex = this.getOption("tooltipZIndex");
    this.bindDocumentResizeListener();
    this.bindScrollListener();
  }
  hide() {
    if (this.getOption("tooltipZIndex") === "auto") {
      zindexutils.clear(this.container);
    }
    this.remove();
  }
  updateText() {
    const content = this.getOption("tooltipLabel");
    if (content && typeof content.createEmbeddedView === "function") {
      const embeddedViewRef = this.viewContainer.createEmbeddedView(content);
      embeddedViewRef.detectChanges();
      embeddedViewRef.rootNodes.forEach((node) => this.tooltipText.appendChild(node));
    } else if (this.getOption("escape")) {
      this.tooltipText.innerHTML = "";
      this.tooltipText.appendChild(document.createTextNode(content));
    } else {
      this.tooltipText.innerHTML = content;
    }
  }
  align() {
    const position = this.getOption("tooltipPosition");
    const positionPriority = {
      top: [this.alignTop, this.alignBottom, this.alignRight, this.alignLeft],
      bottom: [this.alignBottom, this.alignTop, this.alignRight, this.alignLeft],
      left: [this.alignLeft, this.alignRight, this.alignTop, this.alignBottom],
      right: [this.alignRight, this.alignLeft, this.alignTop, this.alignBottom]
    };
    const alignFns = positionPriority[position] || [];
    for (let [index, alignmentFn] of alignFns.entries()) {
      if (index === 0) alignmentFn.call(this);
      else if (this.isOutOfBounds()) alignmentFn.call(this);
      else break;
    }
  }
  getHostOffset() {
    if (this.getOption("appendTo") === "body" || this.getOption("appendTo") === "target") {
      let offset = this.el.nativeElement.getBoundingClientRect();
      let targetLeft = offset.left + $();
      let targetTop = offset.top + D();
      return {
        left: targetLeft,
        top: targetTop
      };
    } else {
      return {
        left: 0,
        top: 0
      };
    }
  }
  get activeElement() {
    return this.el.nativeElement.nodeName.startsWith("P-") ? Z(this.el.nativeElement, ".p-component") : this.el.nativeElement;
  }
  alignRight() {
    this.preAlign("right");
    const el = this.activeElement;
    const offsetLeft = C(el);
    const offsetTop = (L(el) - L(this.container)) / 2;
    this.alignTooltip(offsetLeft, offsetTop);
    let arrowElement = this.getArrowElement();
    arrowElement.style.top = "50%";
    arrowElement.style.right = null;
    arrowElement.style.bottom = null;
    arrowElement.style.left = "0";
  }
  alignLeft() {
    this.preAlign("left");
    let arrowElement = this.getArrowElement();
    let offsetLeft = C(this.container);
    let offsetTop = (L(this.el.nativeElement) - L(this.container)) / 2;
    this.alignTooltip(-offsetLeft, offsetTop);
    arrowElement.style.top = "50%";
    arrowElement.style.right = "0";
    arrowElement.style.bottom = null;
    arrowElement.style.left = null;
  }
  alignTop() {
    this.preAlign("top");
    let arrowElement = this.getArrowElement();
    let hostOffset = this.getHostOffset();
    let elementWidth = C(this.container);
    let offsetLeft = (C(this.el.nativeElement) - C(this.container)) / 2;
    let offsetTop = L(this.container);
    this.alignTooltip(offsetLeft, -offsetTop);
    let elementRelativeCenter = hostOffset.left - this.getHostOffset().left + elementWidth / 2;
    arrowElement.style.top = null;
    arrowElement.style.right = null;
    arrowElement.style.bottom = "0";
    arrowElement.style.left = elementRelativeCenter + "px";
  }
  getArrowElement() {
    return Z(this.container, '[data-pc-section="arrow"]');
  }
  alignBottom() {
    this.preAlign("bottom");
    let arrowElement = this.getArrowElement();
    let elementWidth = C(this.container);
    let hostOffset = this.getHostOffset();
    let offsetLeft = (C(this.el.nativeElement) - C(this.container)) / 2;
    let offsetTop = L(this.el.nativeElement);
    this.alignTooltip(offsetLeft, offsetTop);
    let elementRelativeCenter = hostOffset.left - this.getHostOffset().left + elementWidth / 2;
    arrowElement.style.top = "0";
    arrowElement.style.right = null;
    arrowElement.style.bottom = null;
    arrowElement.style.left = elementRelativeCenter + "px";
  }
  alignTooltip(offsetLeft, offsetTop) {
    let hostOffset = this.getHostOffset();
    let left = hostOffset.left + offsetLeft;
    let top = hostOffset.top + offsetTop;
    this.container.style.left = left + this.getOption("positionLeft") + "px";
    this.container.style.top = top + this.getOption("positionTop") + "px";
  }
  setOption(option) {
    this._tooltipOptions = __spreadValues(__spreadValues({}, this._tooltipOptions), option);
  }
  getOption(option) {
    return this._tooltipOptions[option];
  }
  getTarget(el) {
    return k2(el, "p-inputwrapper") ? Z(el, "input") : el;
  }
  preAlign(position) {
    this.container.style.left = "-999px";
    this.container.style.top = "-999px";
    this.container.className = this.cn(this.cx("root"), this.ptm("root")?.class, "p-tooltip-" + position, this.getOption("tooltipStyleClass"));
  }
  isOutOfBounds() {
    let offset = this.container.getBoundingClientRect();
    let targetTop = offset.top;
    let targetLeft = offset.left;
    let width = C(this.container);
    let height = L(this.container);
    let viewport = y();
    return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
  }
  onWindowResize(e) {
    this.hide();
  }
  bindDocumentResizeListener() {
    this.zone.runOutsideAngular(() => {
      this.resizeListener = this.onWindowResize.bind(this);
      window.addEventListener("resize", this.resizeListener);
    });
  }
  unbindDocumentResizeListener() {
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener);
      this.resizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
        if (this.container) {
          this.hide();
        }
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  unbindEvents() {
    const tooltipEvent = this.getOption("tooltipEvent");
    if (tooltipEvent === "hover" || tooltipEvent === "both") {
      this.el.nativeElement.removeEventListener("mouseenter", this.mouseEnterListener);
      this.el.nativeElement.removeEventListener("mouseleave", this.mouseLeaveListener);
      this.el.nativeElement.removeEventListener("click", this.clickListener);
      this.el.nativeElement.removeEventListener("touchstart", this.touchStartListener);
      this.el.nativeElement.removeEventListener("touchend", this.touchEndListener);
      this.unbindDocumentTouchListener();
    }
    if (tooltipEvent === "focus" || tooltipEvent === "both") {
      let target = this.el.nativeElement.querySelector(".p-component");
      if (!target) {
        target = this.getTarget(this.el.nativeElement);
      }
      target.removeEventListener("focus", this.focusListener);
      target.removeEventListener("blur", this.blurListener);
    }
    this.unbindDocumentResizeListener();
  }
  remove() {
    if (this.container && this.container.parentElement) {
      if (this.getOption("appendTo") === "body") document.body.removeChild(this.container);
      else if (this.getOption("appendTo") === "target") this.el.nativeElement.removeChild(this.container);
      else Jt(this.getOption("appendTo"), this.container);
    }
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.unbindContainerMouseleaveListener();
    this.unbindDocumentTouchListener();
    this.clearTimeouts();
    this.container = null;
    this.scrollHandler = null;
  }
  clearShowTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }
  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
  clearTimeouts() {
    this.clearShowTimeout();
    this.clearHideTimeout();
  }
  onDestroy() {
    this.unbindEvents();
    if (this.container) {
      zindexutils.clear(this.container);
    }
    this.remove();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
    }
  }
  static ɵfac = function Tooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Tooltip)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ViewContainerRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Tooltip,
    selectors: [["", "pTooltip", ""]],
    inputs: {
      tooltipPosition: "tooltipPosition",
      tooltipEvent: "tooltipEvent",
      positionStyle: "positionStyle",
      tooltipStyleClass: "tooltipStyleClass",
      tooltipZIndex: "tooltipZIndex",
      escape: [2, "escape", "escape", booleanAttribute],
      showDelay: [2, "showDelay", "showDelay", numberAttribute],
      hideDelay: [2, "hideDelay", "hideDelay", numberAttribute],
      life: [2, "life", "life", numberAttribute],
      positionTop: [2, "positionTop", "positionTop", numberAttribute],
      positionLeft: [2, "positionLeft", "positionLeft", numberAttribute],
      autoHide: [2, "autoHide", "autoHide", booleanAttribute],
      fitContent: [2, "fitContent", "fitContent", booleanAttribute],
      hideOnEscape: [2, "hideOnEscape", "hideOnEscape", booleanAttribute],
      showOnEllipsis: [2, "showOnEllipsis", "showOnEllipsis", booleanAttribute],
      content: [0, "pTooltip", "content"],
      disabled: [0, "tooltipDisabled", "disabled"],
      tooltipOptions: "tooltipOptions",
      appendTo: [1, "appendTo"],
      ptTooltip: [1, "ptTooltip"],
      pTooltipPT: [1, "pTooltipPT"],
      pTooltipUnstyled: [1, "pTooltipUnstyled"]
    },
    features: [ɵɵProvidersFeature([TooltipStyle, {
      provide: TOOLTIP_INSTANCE,
      useExisting: _Tooltip
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Tooltip
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tooltip, [{
    type: Directive,
    args: [{
      selector: "[pTooltip]",
      standalone: true,
      providers: [TooltipStyle, {
        provide: TOOLTIP_INSTANCE,
        useExisting: Tooltip
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Tooltip
      }]
    }]
  }], () => [{
    type: NgZone
  }, {
    type: ViewContainerRef
  }], {
    tooltipPosition: [{
      type: Input
    }],
    tooltipEvent: [{
      type: Input
    }],
    positionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    tooltipZIndex: [{
      type: Input
    }],
    escape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showDelay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    hideDelay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    life: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    positionTop: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    positionLeft: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    autoHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    fitContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideOnEscape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showOnEllipsis: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    content: [{
      type: Input,
      args: ["pTooltip"]
    }],
    disabled: [{
      type: Input,
      args: ["tooltipDisabled"]
    }],
    tooltipOptions: [{
      type: Input
    }],
    appendTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appendTo",
        required: false
      }]
    }],
    ptTooltip: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "ptTooltip",
        required: false
      }]
    }],
    pTooltipPT: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pTooltipPT",
        required: false
      }]
    }],
    pTooltipUnstyled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pTooltipUnstyled",
        required: false
      }]
    }]
  });
})();
var TooltipModule = class _TooltipModule {
  static ɵfac = function TooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TooltipModule,
    imports: [Tooltip, BindModule],
    exports: [Tooltip, BindModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [BindModule, BindModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      imports: [Tooltip, BindModule],
      exports: [Tooltip, BindModule]
    }]
  }], null, null);
})();

export {
  Checkbox,
  CheckboxModule,
  IconField,
  InputIcon,
  Tooltip
};
//# sourceMappingURL=chunk-VT5PSWIM.js.map
