<template>
  <va-fullscreen :items="items" v-model="activeIndex">
    <template #slide="{ item, index }">
      <template v-if="item.key === 'vue-admin'">
        <div
          class="vue-admin-introduction navigation"
          :style="{ background: item.backColor }"
        >
          <div class="left-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="30 0 579.43 484.77"
            >
              <defs>
                <filter
                  id="filter-1"
                  x="-80.0%"
                  y="-80.0%"
                  width="260.0%"
                  height="260.0%"
                  filterUnits="objectBoundingBox"
                >
                  <feGaussianBlur stdDeviation="12" in="SourceGraphic"></feGaussianBlur>
                </filter>
              </defs>
              <g style="opacity: 0.9">
                <g>
                  <image
                    width="609"
                    height="226"
                    transform="translate(0.43 148.18)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M.24,161.44h471a88,88,0,0,1,0,176H.24Z"
                    transform="translate(25.34 9.79)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--info-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="373"
                    height="212"
                    transform="translate(0.14 246.43)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M-.34,259.64h242a81,81,0,1,1,0,162H-.34Z"
                    transform="translate(25.34 9.79)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--error-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="510"
                    height="162"
                    transform="translate(0.06 78.37)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M-.44,91.54h404a56,56,0,1,1,0,112H-.44Z"
                    transform="translate(25.34 9.79)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--warning-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="206"
                    height="127"
                    transform="translate(0.38 357.77)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M0,371H117.5a38.5,38.5,0,0,1,0,77H0Z"
                    transform="translate(25.34 9.79)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--warning-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="142"
                    height="77"
                    transform="translate(308.86 25.74)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M322.05,39h65a13.51,13.51,0,0,1,13.5,13.5h0A13.5,13.5,0,0,1,387.05,66h-65a13.49,13.49,0,0,1-13.5-13.5h0A13.5,13.5,0,0,1,322.05,39Z"
                    transform="translate(25.34 9.79)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--error-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="175"
                    height="77"
                    transform="translate(236.67 341.14)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M249.83,354.35h98a13.49,13.49,0,0,1,13.5,13.5h0a13.49,13.49,0,0,1-13.5,13.5h-98a13.49,13.49,0,0,1-13.5-13.5h0A13.49,13.49,0,0,1,249.83,354.35Z"
                    transform="translate(25.34 9.79)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--success-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="323"
                    height="162"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M-.23,13.17h217a56,56,0,0,1,0,112H-.23Z"
                    transform="translate(25.34 9.79)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--success-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <circle
                  fill-opacity="0.3"
                  fill="#000000"
                  filter="url(#filter-1)"
                  cx="477.54"
                  cy="66.09"
                  r="20"
                ></circle>
                <circle
                  cx="477.54"
                  cy="66.09"
                  r="22.5"
                  style="
                    transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                    fill: var(--info-color);
                  "
                ></circle>
              </g>
            </svg>
          </div>
          <div class="introduction">
            <h1 class="name">{{ item.name }}</h1>
            <div class="desc">{{ item.desc }}</div>
            <div>
              <va-button theme="primary" target="_blank" to="/#/vueadmin/home"
                >预览</va-button
              >
            </div>
          </div>
          <div class="right-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 575.08 485.98"
            >
              <defs>
                <filter
                  id="filter-1"
                  x="-80.0%"
                  y="-80.0%"
                  width="260.0%"
                  height="260.0%"
                  filterUnits="objectBoundingBox"
                >
                  <feGaussianBlur stdDeviation="12" in="SourceGraphic"></feGaussianBlur>
                </filter>
              </defs>
              <g style="opacity: 0.9">
                <g>
                  <image
                    width="605"
                    height="226"
                    transform="translate(0 103.89)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAl0AAADiCAYAAAB0gXKiAAAACXBIWXMAAAsSAAALEgHS3X78AAATjUlEQVR4Xu3d2ZLcOJJAUQ9Z//8nV85DNachT8fCJfZzzMIIgiBTNfOQ18CQ+vbz8xMAANzXn9kCAADOE10AAA8gugAAHkB0AQA8gOgCAHgA0QUA8ACiCwDgAUQXAMADiC4AgAcQXQAAD/Cf2QLu73a73WZrAIBr/DzpfwPx9qSf+5XEFQC8nkdFmOi6k4OBdeQeAGBuGjz3ji/RdaHF0FpZE7G+DgCojSKne+1e8SW6TliIrNH12b3Z3vUA8I1WwiavKe+5Or5E104HQ0t8AcD9zaKmut7O/bp+ZXiJrkWD2FqNrD33r1wDAGq9uBkFVvfaVeElugYmu1r52ux8dc1oHgBYtxpWP+mYx5eEl+gq7NjVGp3vWTuaW7kGAMxfH7bnvWNv7nR4+cdRG4uxtRpaK+PqvDcHAIy1vz+3QNrmVoPpJ/69pz1ewk5XdGNrb1zNro/G1XlvDgAYW3mNWO10TXfBzux2ffVO10JszcZn5vK4Ol+9BgDUu1u9na52Fyuvu3SHa/OVO10XxlbvuHotj6vz1WsA8M1y0Ix2uKrz0Zr2eHi366t2ug7G1iyeVtfNrrWEFwCsa3eq8nneudrGVTj1nnMosrKvia4iuI7GVnVcWdMeR+PqfGTPWgD4FG0I5d+F+bVhe5wFVH5ujrXDPj66Jrtbe2PrzFx7HI2r8z3O3AsA72IUQNWrwSPBVAbX7Xa7HXnF+NHRtbi7tXLcO95z3MzOAYD/qX5P5ki6FXPb559fd/9rFFN/xddeHxldF8fWSmQdia/ReDQHANTaINriqo2t1p/4O7zaOMsOh1br46JrEFy98FqNrVFk9Z6R59pjHlfns3kA4F9bYLXj2WvF3u/k6p7teYd9THSd2N2axdXe84h6Ls/nud75XmfvB4B3kANo+/2357Xi7J6uI9/r+ojo2rG71Yui6rw3N7q3nc9z7TGPq/PeHADw+3dkFUzteFP9Lt7WbefteLMcZD1vH10LwdWLod55b27l/lg4jsbVOQAwl2Mon7fzEX/vbrW/x/Ou12XeNroWYmsb98JoFlMr12My3ozmWtVctrIGAL7BkTDKv5Nvcew5u71ldC0E1yiIRnO9z+z+atweR+PqvGd1HQDwW97dane5qvnq1eThQHu76DoQXL1omn1G90QxznN5Ps+1qjkAYGz0+7P6Xlb7e7kKq9n5KW8VXYvBNQqm3vzqJ98fC8fROBtdAwD6el9+v8XvL8Hf4u/59loeX+ZtoisF1yh0qjg6+8nPi2LcHkfj6nz1GgDwW/6bh5HO87hdcyvmqhjL87u9RXTtDK7qPH/+TK73nhPFuDqOxqM5AGC/7XdqFV953alwOuPlo+tAcN3jE5PxpjeuzntW1wEA41eEo3Xt2nb+blH20tF1p+Ba3eXKz6/Gm5VxNroGAKzZfp/OvgC/zVXXKqvrlr1sdC0EVx73PqPIqq7lZ0Yxbo+jcTa6BgCcd4v9sbT9nu/dd+SZv7xkdF0QXL3QOrvL1R5H49EcAHC9W7zg97haLxddi8FVnfeianVu9PxojqPxaG7VmXsB4FtcEVLb7/krnjX1UtF1IrhWwmpll6v3czbVXL62x5F7AIBYiqW8ZuWeu3mZ6DoYXEdj60/x3Cq0qsjKobQnnPasBQA+yEtE10XBtfe8euY9Ymt1HQDwwZ4eXcX/tE/E7xhq52dBtRpbs9Cqwqs671ldBwB8gadHV1JFUDs/i6pRfB2Nrs1KRK2sAQC+0FOjq/NasR3PYmk1uNrz/NwYHPO4Z2UNAPDFnhZdg+9xjYJrFlkrrxbzs6M4bmYxNbsOABART4quyRfnt/HoczS4cnRFcczjnpU1AAAR8aToKuQYmoXW0eDqhdae4JpdBwD45eHRVexyrQTXSmjtCa4qtqrz1WsAAEMPja6FL863VkNq9W8sRjHezIJqdh0AYOhh0XXB97jaqKp2u2b/REQUxzzOxBYAcIk/swV31AbQ2Y/gAgBe2kOia/Jacfbp7W7NQktwAQAv4yHR1ajiJ1/f+1n5Hld7zONMcAEAl7v7d7qK/23FNoJ6kTQLrNku12ZPcIktAOBu7rrTdfK1YhVbK58oxhvBBQA8xV2jqzCKnqOx1XtWxN/XBRcA8DR3i66du1x5fs+/Pj963kZwAQBPdbfoauSoytf2fkb3tc+txi3BBQA8zF2ia/Dl+W2857Oys5VjbCO4AICXcJfoasxiqzc/+0Qab+ctwQUAvIzLo2uyy5Xnz3zyc6I4ZoILAHiKy6OrUYVRjqb2OPuMntM+q2d2HQDgbi6NrgfucuXYmsWX4AIAnurS6GpUUXT0E2m86c0BALycy6Jr5y5XPh759J6XCTEA4Okui65GDqLVz2h9+7x2PAuq2XUAgIe4JLrusMvVWxNpvKl+nuACAF7GJdHVqHaizn7yszY5zgAAXtbV0TWSI6kXVtWa1kpkrawBAHiY09HVebU4C6uV+d4ztrn22BJcAMDLOR1djdGO1N7Iate0BBUA8JZORdfiF+h7MbUaYDm+8vNaogwAeEmnoqtjz+7V6rreHADAW7gqukYxVIXUyq5Wtcu1WZ0DAHgJh6Nr8mqxF1D52uh6S1ABAG/tcHQ1qtjK53uCK9/bnuc1+RoAwEu6Irp6ciTl2GrnqnXtmpHZdQCAp7squo6EVG9dZXYdAOClHYqu4vtcEWuvA0e7XTnQBBYA8DEORVdjFkajkOrFVmsWX7OfDwDwEs5GV8Q8lGaxtc3NrKwBAHhJu6Nr8mrxSGz11swia3YdAOBl7I6uxuprvyqgclj1IuuWjgAAb+lMdPX0QmnPLtbM2fsBAB7qbHRVYZWPq7tYVwUZAMDLORtdEeOdrXyeo2q2K1ZdAwB4O7uiq/Ml+og6pLZxtXt1Jqr2rgcAeLpd0dWYhU/vdWJvpyuPAQA+ytHo6ql2uWbr2vPRPQAAb+tMdI3CKc/3XjG2x9VrAABv50x0tXpBlY1eL67Yux4A4CWcja6j39ESTwDAV1mOrsHfXBzpvVqs1gEAfKzl6Nrh6KtF4QUAfKwj0TWKqtma6tqR15MAAG/lSHStWgmvao3YAgA+ztHo6u1WVfMr3+kCAPhoR6PriLPhdfZ+AICnuUd0rbxWzGMAgI92RXTtjae96wEA3t6Z6BJPAACLzkTXyJ4g27MWAOAtXRld4gkAoOPK6Mr8UxEAAP91z+gCAOC/zkbXVTtZVz0HAOAlnY0uAAAWiC4AgAcQXQAAD3A2un5mCxZd9RwAgJd0NroAAFhwz+j6CTtYAAARcW10CSwAgI4ro6u1J8D2rAUAeEtnokssAQAsOhNdm73xtXc9AMDbuyK6slFUtdfEFwDwNe4RXT1nI+vs/QAAT3M0unIA/aRjO++fjgAAvt7R6Fqx8pqxWiPQAICPcyS6elG0+n2t3i7ZaAwA8NaORNfMKMpGUSWyAICPtRxdPz8/R6Jo9Ttds+sAAG9tObo6RrtXe14xAgB8tLPRtVl9VTh7xXh0HgDgpZ2Jrl5oVfPVK8be+moNAMBbOxNdlbyLVUVTO18dhRYA8HGORtcsjFZ3u/KaFavrAABexq7oGvwNxt73tPbsdlVrRtcBAN7Grujq6MVRFV85wlbuBQB4e2ejqxdLs+9oVTtdVZT1rKwBAHgZZ6Jr72vB0U4XAMBHOxNdWS+mqt2rKr56O2LtEQDgLe2Ors6X6as4yq8Qeztd1Xkvwlqz6wAAL2N3dBVGu1ijXa4cWzMrawAAXtLZ6FoNodEu10qg9az+fACApzoUXYNXjFVEjUJr9T4AgLd2KLoKox2q1dBqj9noujgDAF7eFdG1+vpvtqOV5/MYAOBtXRFdrdGu1ur1dr5ltwsAeFuHo6v4Xld1Ptq9Wrm+EVUAwFs7HF3JKIpmYTWLrSq+7HYBAG/lVHQt/C3GHEm9qJqta68BALydU9FVGO1A9Xa5ep+8dpOf1xJmAMBLujK6ZjtYq2GV51uiCgB4S6ej68AX6tu5I1G2zbXHljADAF7O6ehKRgG2N7Sqe9prvfPeHADA01wdXa1eOI1Cq3etvd6ej8yuAwA8zCXRtfCKMc+vhNbKmo3AAgBe2n9mCw74iYhbM66u5+N2Ty+8tue1RtfaNaPrAAAPcclOV8Rddrtmn97zst48AMDD3GOnK+LvHaYqenrhVY1v8fcz8nPbnaz257Z68wAAD3HZTldE7N3tWv3804wjjXvnAAAv5V47XRF/7y5VIbTtYLXf5YpifEvnWfszfL8LAHhJl+50RUx3u6odqtVPdU8U4/aY9eYBAO7q8uhKquCaxVX+/FPM5WfmcXU+mwcAuJu7vF78+fn5ud1uvS+4t9FTvTrcQutPmhsFVsTfz5q9cuzNAwDcxV2iK9kCJwfRdi2Pq9BqQyzf1xJeAMBLult0pd2u3k7XprfjVc21x0rvZwovAOBp7v2drqz3ivCn86m+z5U/WRVredwaBRwAwCXuGl3pbzJW41lQrcRXvhbFeCO8AICnuNvrxc3gS/VV6PReM27H7Xtd7fe72jWb/N2u7WdGGrfa9QAAl7p7dCVtcM2+7zWKr97aVn7+SnjNrgEAHHLX14ubg68Z/1k8zj7552yqUFu5BgCw28N2una+ZmzXrBzz68YeO14AwFOshMo99Haeqh2qaner2u0a7XxFMd7Mom90HQBgycN2uiKi9293bVGTd8Fy7ORgqr5UP9rxqnbV8nfJ7HoBAHfx0OiK6IbXNt5UgZRjqze3El75+auvG9u1AADLHh5dHVUIZVVY9WJr5TteOcBWwmu7HpM1AAB/eUp0DV4z7gmv2S7X2fDarvesrAEAiIgnRVfENLy2ucqe2Pon/n3e9plF2GZvfAkvAGDoadEVMQyvSOPWamxVgbVFWKva7cohNQur6vthAAD/76nRVeh9tyrHV3te7Wz9SeORWVDt2fWKWF8HAHyRp0dX8Y+mRtS7Xtt8xO+drBxYvRCb6e16bdeiOO9ZXQcAfIGnR1fE9Ptd+dVdG145pkaxlb/f1X42vV2vK+IrYr4WAPhQLxFdEYfDK6IfV0d2uio5uI7GV8Tv16Qr9wAAH+BloiviVHhFrL1ybHe32rXbzxhF0Gp8tXMz+b8hYv1eAPhm1e/QLK9ZueduXiq6InaFV6UNqyq2qiibxVZ+5TiLr+2ePLdq9t8IAFzjJx74e/floitiObxmEdb7ztctfdp/bDVfGxn9Wdo/e2v2TADgmF4TPCyqZl4yuiKWw2vF7B9Iba9n7S5X3vHq6e1+Rfz95155FgCwz55G2Mx2vI4885eXja6IpfAaBdh2fRRZK5/2We243RmrdryqP1sbWr0/txgDgHXV79PR3GpAra5b9tLRFXEovNoYihhH1uxvNOZnVbtdR3bA2rns8v8nA8CXyD3QfvK61Vi7zMtHV8QwvCqja9nKrlfEWnyN5D9T+5xqLQCwroqt2bqHe4voiijDK6K/21Vpw+nIJz+jPc/Ho1b+OwCA30a7WXmc1+S5VnXfIW8TXRG/wiuijp7KkRjqRVq+1guu9rwdV3/Odh0AcMxKZOXr+VoeX+atoitiObxmO0a9oJoFVvuZhVf7Z2wdCcDN0fsA4BP1winHVfVp121m56e8XXRFTMPr1/Lo70BV6/bE1yi8coC159WfaVs3cibYAODT7I2u2ZrqeutUhL1ldEX8G14REQvf8+rF2HZPjqtqvoqsPeGV/xx5vFmJqlP/DweADzaLrt7nId42ujaLrxvztTxuz9sAqyIrz0dn3AuvKMbbfe15OwcAjOXf97PwiqjXtPOXevvoipiGV8Tv+MlGAZbPc1y1z85xNTr2Yiv/OfYSagB8g97vyBxS7Xj0md2zOfK7OSI+JLoiYs/rxpFRbOXw6p1HMZd/fhVf1Xk7v2r23wgAn6gKo1lo5cjK93dt3bHHx0TX5sCuVxtL+Z4cX/laXtcLsHzM8ZXn27ko5gGA33I47Y2v9p7s9O/ij4uuiFjZ9Wr1dpci+oE1G8fisf25bYBV1wGAsRxd27GKr3/SeXvfSoTt9pHRtensekX8HUgr/8dsY6q9rxdb1fN78bWNc4Ct/LkqOd4A4BONfk/+FMfVz8js+tDtwCvJt5TiK+J39OTxkePKmk1vXJ2P7FkLAJ9ib3Rtxz2fKMaHvs8V8UXRFVGGV8RaCLVB1V6rQmu2vlqbjUJKZAHA33LMtOe9eFoJrepe0bXHyfhaOa5ey+PqfPUaAHyzPeHVi6/emvYouo7YGV/t+SiuqjnBBQD3NwuvKqR6O1rV+sPBFfHl0bVZiK98PhvPrudxdd6bAwDGql2udjwKsDzXHkXXVTrxFbEeSyvj2bXeHACwrrfrdfR4KrgiRFdpMb72ns/W9uZWrgEAv0OrmpvGVWdOdN3TIL4i5hG1ElWrcQcA7NcLrt64d/10cEWIrmUnA6w3N5qfXQMAar246UbV6NoVwRUhug7ZGWC9uZVrlb3rAeBbzKJm9vrx1/WrgitCdJ0yia/NkR2uyt71APCNVsJmtMv1v8mLI0l0XehkhGWr6wCA2ihyuteujq2N6LqTxQDLjtwDAMxNg+desbURXQ90MMQAgDu6d2xtRNcLEGMA8DiPiqxMdAEAPMCf2QIAAM4TXQAADyC6AAAeQHQBADyA6AIAeADRBQDwAKILAOABRBcAwAOILgCABxBdAAAP8H9VKE5I+SV7owAAAABJRU5ErkJggg=="
                  ></image>
                  <path
                    d="M104,118H571V294H104a88,88,0,0,1,0-176Z"
                    transform="translate(8.97 8.95)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--success-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="476"
                    height="185"
                    transform="translate(128.84 202)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M212.5,216H571V351H212.5a67.5,67.5,0,0,1,0-135Z"
                    transform="translate(8.97 8.95)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--error-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="312"
                    height="122"
                    transform="translate(293.08 304.98)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M345,319H571v72H345a36,36,0,0,1,0-72Z"
                    transform="translate(8.97 8.95)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--warning-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="264"
                    height="122"
                    transform="translate(340.94 363.98)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M393,378H571v72H393a36,36,0,0,1,0-72Z"
                    transform="translate(8.97 8.95)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--info-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="390"
                    height="185"
                    transform="translate(214.81)"
                    xlink:href="data:image/png;base64,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"
                  ></image>
                  <path
                    d="M298.5,14H571V149H298.5a67.5,67.5,0,0,1,0-135Z"
                    transform="translate(8.97 8.95)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--warning-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="142"
                    height="77"
                    transform="translate(69.89 44.75)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAABNCAYAAABwgVwSAAAACXBIWXMAAAsSAAALEgHS3X78AAAFzUlEQVR4Xu2c65KbMAxGxU7f/5GX/thqq3z5ZMkXSCA6M4xl2dCATkVme9n2fZei6OUr2lAUjBKnGKLEKYYocYohSpxiiBKnGKLEKYYocYohSpxiiBKnGOJPtOFMtm3boj2fzP5Gfz60veqzlCRreJVMp4rTIUt236eQKtKZEp0iTiBMJEm0fleiwrjrZwh0qDgNYVg+I0hmz5XJFIPtoecdKdBh4jjS2Fy07pHZc0UyhYikeVo/Sp5DxCHStISJ5l7uzkSCRPOHtSPkWSpOhzCZmM0/jawcmXipQMvESUqDo5djcy93J3o6DROktfYzWVTwo34AGAkSrVvuLovF3qsWWHNY8E2eBdnMiLmlLOk40G287tISpyUSxp9A9OphY2vNjku6zrQ4HdJgHMnDZLm7QK1XVSRNj0TT8kyJ0ylNNPfORe4qT680kTiHynPGdxw8WF5IrHyCPLs835PNoRSbiRXNWezepQyLE3QbjVsH2yMQ67xFtP6uYNFb6xlhPDk0r/t+Rdq2bRvtOsPiEDwZsoeQ2I4Zeva+gkgWi+0yVg4bt4RBlnafIXGcboOxzfUcArHO70D2PvA15XWbFrjPSvMbj3adIXEIWGRPBHt8BXvFjBjfGZTGCmNjPb6Da9icyKNAw8yKwwrLJMlIwwSyI8Z3xJPGCoN8ybM87Dnhq2pKoFlxEPzAKAJKk+k6Os+Q3fcqokKhNBpH3cbKg+cqU6Ig3eIEfyZlcygBHq2uI2TE+IpEn9/rBl7RrTD4vDyBdM9vbuR7Trc4BlZQW3iW7znw/E8Ai46vFwZ7Vuy1JE6+SxhlRhwEhWEysXFWnKtKNVQwgAm2Qaz7xOSnWSkOA2XSMXPgOXdjxT3Z57Osm2SYFYfdPCu6F9sck8Zef8WDvgK2U7A55lmXQZGYRFNizYqD4A16hUd5ECYY23MHWEE1b2OESeHFbD7FanEiWiJhh2FE61cEu4sH29cS5VCO+rfjPQXOdqlPo/Ucep5Lz940R4nTYz7utfOe69yN1nPoeS49e9Oc/arC9zZ7h7d+h2T3XYlsYXdz2ByLD2e1OFYGnLMY99vzxOzRmO25GyiDd587jK2YzaeYFYcVHqXYG7H3hQ7zp37xewNQip0cbJ3FdrRMPc9ZcSKsWCiPyOSH/8dVX1mte8+I0xIJ4+WsFAclEWl3mVVdZMU13o2sOK29GNs908yIg6Kw7yM2790owxPsqt0lCytyJE8klD2X5YfoFmff9x3+aoUVyOZEHouO47fwHwfg9ew8utF3Fyv6/Eqr6Pb4Jjm2H3nI9f6VCpEBcQJY0UUeBbLCfP9bw8Nep6fjdD+ANwOFwdE7rEACsbL02cyKYwuscWi4xN3Ge00tvfk3xZPHE6jVdexhr4dxN7PiKCiQxSt41G0+URoFC+xJE0mCOc1PMyQOfM9BafB1kv2gKAx7VUVEr7JXk70PkUcBdOwRCKHyjHy/ERkUx0GLnf0gVpSo27Sw69lf+x2IPisW2pOG5TyRol8zzbA4TtfRUXMMKwfL2WsIxCy37GG8EHYPKI6OvQKxa/wEg91GZEKcACsSy+OcvZ50xGv0dLUr0ZKHjUwWb76cqf/mRESi/3zAjhi39trRwnJ3olceHZk4rXOmuo3IAnFEuuTRMdrTij8BWxQWRx2oNU5LI7JIHJFQHsxF65ZPk0bBwrBXT0scXP8JFhX8rO84G8nZfRZ7jp3b3F1hRe0VyFtbyrKOI/LUdURyr57WK+nuokR40ozEy7qNyGJxlA6BMnMvd2d6Og+bHyaMcog4IlQekbZAXg7J7LkimUJEQj2tHyGNyIHiiLjyiJQ0HpliRPL8Tx5Y3EPFURoCicQyROt3JSqMu36kMMop4iiBQJbsvk8hVaQzhFFOFcfSIVHR4ExZLC8Th1EytXmVJIy3Eqe4Dkf92/Hi5pQ4xRAlTjFEiVMMUeIUQ5Q4xRAlTjFEiVMMUeIUQ5Q4xRB/AelwFo4tukdPAAAAAElFTkSuQmCC"
                  ></image>
                  <path
                    d="M99.43,58.8h65a13.49,13.49,0,0,1,13.5,13.5h0a13.49,13.49,0,0,1-13.5,13.5h-65a13.5,13.5,0,0,1-13.5-13.5h0A13.5,13.5,0,0,1,99.43,58.8Z"
                    transform="translate(8.97 8.95)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--error-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <g>
                  <image
                    width="142"
                    height="73"
                    transform="translate(188.95 374.52)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAABJCAYAAADrEB4EAAAACXBIWXMAAAsSAAALEgHS3X78AAAFYElEQVR4Xu2b607zSgxFHXTe/5HJ+fHJsLtre5y5lHbiJUVz8wQSL5yowHGepxTFVb5aAUVhUeIUXZQ4RRclTtFFiVN0UeIUXZQ4RRclTtFFiVN08V8r4BUcx3G0Yopfzjf4uP/4i++hRJnLX4j0MnGSsmRi7kwzWa+SaLk4DWF61+5ElCB3bbVAy8QJhOH5rCDZuE8nmxCOM/etEmiJOI40ONda98jEfDKZZFgxOPe0vkKeqeJcFCZTeXYXpUVLEh6/TKBp4hjSZIQ5qEXuLo0SyZOR5mH/LHmmiJOUxmujPnIXkbyEtMTwWu5PkWfFB4AtUUYF2h2+bk3y4fRbnHItPsVwxaFqE8nREscSyRrfBe9dJtO2YoarzpA4ndJckQi5i0BWQloinHCI0bfaIXlWPKpEYlGiMe9ldpdHHyvWHK6hGBG4dyrd4jSqjfY9Sbw16xzIHcThMcqCrQoR7bHif0Q6juPorTrd4hh4goj8/vmGJ48lkI49dpEIE8fXhGsqiSeMcojIt9jn+pFmlC5xnGrDfZ475J9AGWm4bZGNexciWRCsMigM9vH4pnUE5376vVWnSxwDlsc6PGksgax2JzLXhAJw6yX6S/7JY/EkzQij4rAw2mYPlEmMvpK50TuhkmhfW5bHksS7V1yJhgQaFYfhbxolwXFUfcRold0FwqTq+JBnYZQveRQIhdOxMiQKc1mcxq8XcI5luXIItNzfGRRGx947C2LdM6tqKQ/n63nPuSwOYCUWE2/NZ4XivciuEvVWBxQERcFzRPPZr/PAiDiMl2CrzRy4B9lVHEaT2kquJYW3t3WuNDPFQSJpuG1Jcwd5+N0E56w1LyYjzxRGxbmSwIw8GMvjnfGkwTHHjUpyJfaJUXEs+CZYAnjVhIXxYnYkeqToNVsxljTW/m5JLFb+J+dIgr29I+d8d1Zc88jekJXijBju7R0557uz4ppH9oaseFRZz+eD+t6LX/Qs55id4Ws8nTmr5b41HmZUHE5qhCcNP4s1Fuf4wrNf81OwEusJgRJF8rS4EvvEqDgekSSeNEgUM/1F701oyWMdHBO1U5kpjiaax54s0QXxnjvA98MSIDq8Pcg0iUbEwaSyFN48rmcvwhJyd/AaW+JYa9Y5vPkuLotznudJv+jkxOqcyLMg3k8CgrLxO8/u1YfvC98vT56WUMzD3NVfcIp0iNOAJcJvCCXSP23EjwN0r/VYY4F2x/th4/439C25kKn3blQcFIWTbcUyKhALI9ROvegP4QzangPPwf3LjIqjsEAW3+J/4Kj7udpkpfm0R1jmmkR8abCPB1cgFgfPNUSXOPSew9JY7zsqAFcYq9pYjygLXJtyM/6I6HvnhEfS8DpjytPzfiPSKY4DCoIcYv+7hsLCYBzv2UUWD74mK9kZgaw1PMcwq/4FmPvZsc5hi0QVaAeiSsESeZJEY4G2u9qIzK04yCl29bHQWJHHqsN7s+f7dDLyWG1TlJkMVRyRsOpwG61ZrbJ7lfHgxGTk0bYVM1RtRCaII3JJnqiN+ncGE2T1r7bD0oiseVSdcu2xovFWH7mLSN596xWI+1OYUnFEnqqOSK6SeI8nb+6OWAlqyeFKM6PaiEwUR8SUR6QtjTf25u5EJI01DqvMLGlEJoujXBQommMyMZ9MJhktmZYKoywRR8SVRyRXaSyycZ9ONiFR5fmdXJTgZeIogUAisQx3EaVFlCB3bZUwynJxlIZASibmzjSTtVoY5WXiIEmJiiSvkgX5E3GYEukafyEK8xbiFJ/Hyv/kLDamxCm6KHGKLkqcoosSp+iixCm6KHGKLkqcoosSp+iixCm6KHGKLv4Hoce3hmt0vV8AAAAASUVORK5CYII="
                  ></image>
                  <path
                    d="M216.5,388.57h69a11.5,11.5,0,0,1,11.5,11.5h0a11.5,11.5,0,0,1-11.5,11.5h-69a11.5,11.5,0,0,1-11.5-11.5h0A11.5,11.5,0,0,1,216.5,388.57Z"
                    transform="translate(8.97 8.95)"
                    style="
                      transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                      fill: var(--success-color);
                      fill-rule: evenodd;
                    "
                  ></path>
                </g>
                <circle
                  fill-opacity="0.3"
                  fill="#000000"
                  filter="url(#filter-1)"
                  transform="translate(106.010000, 376.700000) scale(-1, 1) translate(-106.010000, -376.700000) "
                  cx="106.01"
                  cy="376.7"
                  r="20"
                ></circle>
                <circle
                  cx="106.01"
                  cy="376.7"
                  r="22.5"
                  style="
                    transition: fill 0.3s var(--cubic-bezier-ease-in-out);
                    fill: var(--info-color);
                    fill-rule: evenodd;
                  "
                ></circle>
              </g>
            </svg>
          </div>
          <div class="icon-arrow-up" @click="handleNext">
            <svg
              t="1711287080764"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7505"
              width="128"
              height="128"
            >
              <path
                d="M938.666667 785.066667a16.896 16.896 0 0 1-6.331734-1.211734L512 615.714133 91.682133 783.854933A17.117867 17.117867 0 0 1 68.266667 768V597.333333c0-6.980267 4.266667-13.2608 10.752-15.854933l426.666666-169.8304a16.964267 16.964267 0 0 1 12.612267 0l426.666667 169.8304A17.066667 17.066667 0 0 1 955.733333 597.333333v170.666667a17.083733 17.083733 0 0 1-17.066666 17.066667zM512 580.266667a17.066667 17.066667 0 0 1 6.3488 1.211733L921.6 742.792533v-133.888l-409.6-163.037866-409.6 163.054933v133.888l403.2512-161.314133A16.725333 16.725333 0 0 1 512 580.266667z m426.666667-135.68a16.776533 16.776533 0 0 1-6.365867-1.245867L512 274.397867l-420.3008 168.96a17.066667 17.066667 0 1 1-12.731733-31.675734l426.666666-171.52a16.9472 16.9472 0 0 1 12.731734 0l426.666666 171.52A17.066667 17.066667 0 0 1 938.666667 444.586667z"
                p-id="7506"
              ></path>
            </svg>
          </div>
        </div>
      </template>
      <template v-else-if="item.key === 'bee-mobile'">
        <div class="bee-mobile-introducation navigation">
          <div class="icon-arrow-down" @click="handlePrev">
            <svg
              t="1711287080764"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7505"
              width="128"
              height="128"
            >
              <path
                d="M938.666667 785.066667a16.896 16.896 0 0 1-6.331734-1.211734L512 615.714133 91.682133 783.854933A17.117867 17.117867 0 0 1 68.266667 768V597.333333c0-6.980267 4.266667-13.2608 10.752-15.854933l426.666666-169.8304a16.964267 16.964267 0 0 1 12.612267 0l426.666667 169.8304A17.066667 17.066667 0 0 1 955.733333 597.333333v170.666667a17.083733 17.083733 0 0 1-17.066666 17.066667zM512 580.266667a17.066667 17.066667 0 0 1 6.3488 1.211733L921.6 742.792533v-133.888l-409.6-163.037866-409.6 163.054933v133.888l403.2512-161.314133A16.725333 16.725333 0 0 1 512 580.266667z m426.666667-135.68a16.776533 16.776533 0 0 1-6.365867-1.245867L512 274.397867l-420.3008 168.96a17.066667 17.066667 0 1 1-12.731733-31.675734l426.666666-171.52a16.9472 16.9472 0 0 1 12.731734 0l426.666666 171.52A17.066667 17.066667 0 0 1 938.666667 444.586667z"
                p-id="7506"
              ></path>
            </svg>
          </div>
          <section class="Introduce-jumbotron">
            <img :src="beeMobileLogo" width="200" height="200" alt="" />
            <h1 class="margin-top-20 text-center title">Bee Mobile</h1>
            <div class="subtitle">为移动而生的React移动组件库</div>
            <div class="margin-top-30 text-center">
              <va-button
                theme="primary"
                to="https://tiny-component.github.io/#/docs/introduce"
                target="_blank"
                >开始使用</va-button
              >
              <va-button
                to="https://tiny-component.github.io/#/components/overview"
                target="_blank"
                >查看实例</va-button
              >
            </div>
            <div class="subtitle github-box">
              <img
                class="margin-right-10"
                src="https://img.shields.io/npm/v/bee-mobile.svg?style=flat-square"
                alt="bee-mobile"
              /><iframe
                src="https://ghbtns.com/github-btn.html?user=IronPans&amp;repo=bee-mobile&amp;type=star&amp;count=true"
                frameborder="0"
                scrolling="0"
                width="110px"
                height="20px"
              ></iframe>
            </div>
          </section>
        </div>
      </template>
    </template>
  </va-fullscreen>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import vaFullscreen from "../base/vary-ui/components/fullscreen";
import beeMobileLogo from "@assets/images/logo-white.svg";

const activeIndex = ref(0);

function handleNext() {
  activeIndex.value = 1;
}

function handlePrev() {
  activeIndex.value = 0;
}

const items = [
  {
    key: "vue-admin",
    name: "Vue Admin",
    desc: "基于 Vue3 开发的管理后台",
    backColor: "#ffffff",
  },
  {
    key: "bee-mobile",
    name: "Bee Mobile",
    backColor: "blue",
  },
];

function handleNavigation(index: number) {
  if (index === 0) {
    router.push({
      name: "home_index",
      query: {
        ...route.query,
      },
    });
  }
}

declare const window: any;

function addThemeLink() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.id = "admin-theme";
  link.href = `${window.NODE_ENV === "production" ? "/" : "/"}themes/white-dark.css`;
  document.head.appendChild(link);
}

onMounted(() => {
  document.body.style.overflow = "hidden";
  addThemeLink();
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style lang="less">
.navigation {
  --name: common;
  --font-weight: 400;
  --font-weight-strong: 500;
  --cubic-bezier-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --cubic-bezier-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --cubic-bezier-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --border-radius: 3px;
  --border-radius-small: 2px;
  --font-size: 14px;
  --font-size-mini: 12px;
  --font-size-tiny: 12px;
  --font-size-small: 14px;
  --font-size-medium: 14px;
  --font-size-large: 15px;
  --font-size-huge: 16px;
  --line-height: 1.6;
  --height-mini: 16px;
  --height-tiny: 22px;
  --height-small: 28px;
  --height-medium: 34px;
  --height-large: 40px;
  --height-huge: 46px;
  --base-color: #fff;
  --primary-color: #18a058;
  --primary-color-hover: #36ad6a;
  --primary-color-pressed: #0c7a43;
  --primary-color-suppl: #36ad6a;
  --info-color: #2080f0;
  --info-color-hover: #4098fc;
  --info-color-pressed: #1060c9;
  --info-color-suppl: #4098fc;
  --success-color: #18a058;
  --success-color-hover: #36ad6a;
  --success-color-pressed: #0c7a43;
  --success-color-suppl: #36ad6a;
  --warning-color: #f0a020;
  --warning-color-hover: #fcb040;
  --warning-color-pressed: #c97c10;
  --warning-color-suppl: #fcb040;
  --error-color: #d03050;
  --error-color-hover: #de576d;
  --error-color-pressed: #ab1f3f;
  --error-color-suppl: #de576d;
  --text-color-base: #000;
  --text-color-1: rgb(31, 34, 37);
  --text-color-2: rgb(51, 54, 57);
  --text-color-3: rgb(118, 124, 130);
  --text-color-disabled: rgba(194, 194, 194, 1);
  --placeholder-color: rgba(194, 194, 194, 1);
  --placeholder-color-disabled: rgba(209, 209, 209, 1);
  --icon-color: rgba(194, 194, 194, 1);
  --icon-color-hover: rgba(146, 146, 146, 1);
  --icon-color-pressed: rgba(175, 175, 175, 1);
  --icon-color-disabled: rgba(209, 209, 209, 1);
  --opacity-1: 0.82;
  --opacity-2: 0.72;
  --opacity-3: 0.38;
  --opacity-4: 0.24;
  --opacity-5: 0.18;
  --divider-color: rgb(239, 239, 245);
  --border-color: rgb(224, 224, 230);
  --close-icon-color: rgba(102, 102, 102, 1);
  --close-icon-color-hover: rgba(102, 102, 102, 1);
  --close-icon-color-pressed: rgba(102, 102, 102, 1);
  --close-color-hover: rgba(0, 0, 0, 0.09);
  --close-color-pressed: rgba(0, 0, 0, 0.13);
  --clear-color: rgba(194, 194, 194, 1);
  --clear-color-hover: rgba(146, 146, 146, 1);
  --clear-color-pressed: rgba(175, 175, 175, 1);
  --scrollbar-color: rgba(0, 0, 0, 0.25);
  --scrollbar-color-hover: rgba(0, 0, 0, 0.4);
  --scrollbar-width: 5px;
  --scrollbar-height: 5px;
  --scrollbar-border-radius: 5px;
  --progress-rail-color: rgba(235, 235, 235, 1);
  --rail-color: rgb(219, 219, 223);
  --popover-color: #fff;
  --table-color: #fff;
  --card-color: #fff;
  --modal-color: #fff;
  --body-color: #fff;
  --tag-color: #eee;
  --avatar-color: rgba(204, 204, 204, 1);
  --inverted-color: rgb(0, 20, 40);
  --input-color: rgba(255, 255, 255, 1);
  --code-color: rgb(244, 244, 248);
  --tab-color: rgb(247, 247, 250);
  --action-color: rgb(250, 250, 252);
  --table-header-color: rgb(250, 250, 252);
  --hover-color: rgb(243, 243, 245);
  --table-color-hover: rgba(0, 0, 100, 0.03);
  --table-color-striped: rgba(0, 0, 100, 0.02);
  --pressed-color: rgb(237, 237, 239);
  --opacity-disabled: 0.5;
  --input-color-disabled: rgb(250, 250, 252);
  --button-color-2: rgba(46, 51, 56, 0.05);
  --button-color-2-hover: rgba(46, 51, 56, 0.09);
  --button-color-2-pressed: rgba(46, 51, 56, 0.13);
  --box-shadow-1: 0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.06),
    0 5px 12px 4px rgba(0, 0, 0, 0.04);
  --box-shadow-2: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  --box-shadow-3: 0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05),
    0 12px 48px 16px rgba(0, 0, 0, 0.03);
}

.icon-arrow-up {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, 0);
  width: 30px;
  height: 30px;
  z-index: 100;
  animation: moveUp 1s linear infinite;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
}

.icon-arrow-down {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translate(-50%, 0) rotate(180deg);
  width: 30px;
  height: 30px;
  z-index: 100;
  animation: moveDown 1s linear infinite;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
}

@keyframes moveUp {
  0% {
    transform: translate(-50%, -5px);
  }
  20% {
    transform: translate(-50%, 0);
  }
  40% {
    transform: translate(-50%, 5px);
  }
  60% {
    transform: translate(-50%, 0);
  }
  100% {
    transform: translate(-50%, -5px);
  }
}

@keyframes moveDown {
  0% {
    transform: translate(-50%, -5px) rotate(180deg);
  }
  20% {
    transform: translate(-50%, 0) rotate(180deg);
  }
  40% {
    transform: translate(-50%, 5px) rotate(180deg);
  }
  60% {
    transform: translate(-50%, 0) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -5px) rotate(180deg);
  }
}

.margin-top-30 {
  margin-top: 30px;
  margin-bottom: 30px;
}

.margin-right-10 {
  margin-right: 10px;
}

.bee-mobile-introducation {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2196f3;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(0deg, #000, #0000 5%),
      linear-gradient(270deg, #000, #0000 5%);
    background-size: 20px 20px;
    opacity: 0.1;
  }

  .Introduce-jumbotron {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 40px 30px 30px;
    color: #fff;
  }

  .va-button {
    margin-right: 30px;
  }

  .title {
    font-size: 70px;
    font-weight: bold;
    text-shadow: 4px 4px 4px rgba(#000, 0.3);
  }

  .subtitle {
    font-size: 16px;
  }
}

.introduction {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translate(0, -50%);
  text-align: center;
  font-size: 16px;

  .name {
    font-size: 80px;
    font-weight: bold;
    color: #333;
    text-shadow: 4px 4px 4px #aaa;
  }

  .desc {
    margin-bottom: 20px;
  }
}

.vue-admin-introduction {
  width: 100%;
  height: 100%;
}

.left-icon {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 440px;
  height: 375px;
}
.right-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 440px;
  height: 375px;
}
</style>
