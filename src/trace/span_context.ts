/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TraceState } from './trace_state';

/**
 * A SpanContext represents the portion of a {@link Span} which must be
 * serialized and propagated along side of a {@link CorrelationContext}.
 */
export interface SpanContext {
  /**
   * The ID of the trace that this span belongs to. It is worldwide unique
   * with practically sufficient probability by being made as 16 randomly
   * generated bytes, encoded as a 32 lowercase hex characters corresponding to
   * 128 bits.
   */
  traceId: string;
  /**
   * The ID of the Span. It is globally unique with practically sufficient
   * probability by being made as 8 randomly generated bytes, encoded as a 16
   * lowercase hex characters corresponding to 64 bits.
   */
  spanId: string;
  /**
   * Only true if the SpanContext was propagated from a remote parent.
   */
  isRemote?: boolean;
  /**
   * Trace flags to propagate.
   *
   * It is represented as 1 byte (bitmap). Bit to represent whether trace is
   * sampled or not. When set, the least significant bit documents that the
   * caller may have recorded trace data. A caller who does not record trace
   * data out-of-band leaves this flag unset.
   *
   * see {@link TraceFlags} for valid flag values.
   */
  traceFlags: number;
  /**
   * Tracing-system-specific info to propagate.
   *
   * The tracestate field value is a `list` as defined below. The `list` is a
   * series of `list-members` separated by commas `,`, and a list-member is a
   * key/value pair separated by an equals sign `=`. Spaces and horizontal tabs
   * surrounding `list-members` are ignored. There can be a maximum of 32
   * `list-members` in a `list`.
   * More Info: https://www.w3.org/TR/trace-context/#tracestate-field
   *
   * Examples:
   *     Single tracing system (generic format):
   *         tracestate: rojo=00f067aa0ba902b7
   *     Multiple tracing systems (with different formatting):
   *         tracestate: rojo=00f067aa0ba902b7,congo=t61rcWkgMzE
   */
  traceState?: TraceState;
}
